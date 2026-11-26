import { useState, useEffect, useRef, useId } from 'react';
import { X } from 'lucide-react';

const estadoInicial = {
  nombre: '',
  cedula: '',
  direccion: '',
  telefono: '',
};

// tiempo de la animación de entrada y salida
const DURACION_MS = 200;

const focoVisible =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C23B1F]';

const claseInput =
  'w-full rounded-xl border border-[#E6DFD9] bg-[#FAF8F6] px-3.5 py-2.5 text-sm text-[#211713] placeholder-[#9C8F85] outline-none transition focus:border-[#C23B1F] focus:bg-white focus:ring-4 focus:ring-[#C23B1F]/10';

const claseLabel = 'mb-1.5 block text-sm font-semibold text-[#211713]';

const SELECTOR_FOCO =
  'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

// una fila de la vista de consulta etiqueta arriba dato abajo
function Dato({ etiqueta, children }) {
  return (
    <div>
      <dt className="text-sm text-[#7A6E65]">{etiqueta}</dt>
      <dd className="mt-0.5 text-sm font-semibold text-[#211713]">
        {children || <span className="font-normal text-[#9C8F85]">Sin registrar</span>}
      </dd>
    </div>
  );
}

export function ClienteFormModal({
  isOpen,
  onClose,
  onSave,
  clienteEditar,
  soloLectura = false,
  onEditar,
}) {
  const [formData, setFormData] = useState(estadoInicial);
  const dialogRef = useRef(null);
  const idBase = useId();
  const id = (campo) => `${idBase}-${campo}`;

  const [montado, setMontado] = useState(false);
  const [visible, setVisible] = useState(false);

  const copia = useRef({ clienteEditar, soloLectura });
  if (isOpen) copia.current = { clienteEditar, soloLectura };
  const cliente = copia.current.clienteEditar;
  const lectura = copia.current.soloLectura;

  useEffect(() => {
    if (isOpen) {
      setMontado(true);
      let raf2;
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setVisible(true));
      });
      return () => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
      };
    }
    setVisible(false);
    const t = setTimeout(() => setMontado(false), DURACION_MS);
    return () => clearTimeout(t);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    if (clienteEditar) {
      setFormData({
        nombre: clienteEditar.nombre || '',
        cedula: clienteEditar.cedula || '',
        direccion: clienteEditar.direccion || '',
        telefono: clienteEditar.telefono || '',
      });
    } else {
      setFormData(estadoInicial);
    }
  }, [clienteEditar, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;

      const focusables = dialogRef.current.querySelectorAll(SELECTOR_FOCO);
      if (focusables.length === 0) return;
      const primero = focusables[0];
      const ultimo = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primero.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const anterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = anterior;
    };
  }, [isOpen]);

  if (!montado) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      nombre: formData.nombre.trim(),
      cedula: formData.cedula.trim(),
      direccion: formData.direccion.trim(),
      telefono: formData.telefono.trim(),
    });
    onClose();
  };

  const editando = Boolean(cliente);

  const titulo = lectura
    ? 'Datos del cliente'
    : editando
      ? 'Editar cliente'
      : 'Nuevo cliente';

  const descripcion = lectura
    ? 'Información registrada en el directorio.'
    : editando
      ? 'Modifica los datos registrados del cliente.'
      : 'Ingresa los datos para agregarlo al directorio.';

  return (
    <div
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className={`fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-[#211713]/50 p-4 backdrop-blur-[2px] transition-opacity duration-200 ease-out motion-reduce:transition-none sm:items-center ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={id('titulo')}
        aria-describedby={id('descripcion')}
        className={`w-full max-w-md rounded-2xl border border-[#E6DFD9] bg-white p-6 shadow-2xl transition duration-200 ease-out motion-reduce:transition-none ${
          visible
            ? 'translate-y-0 scale-100 opacity-100'
            : 'translate-y-3 scale-[0.98] opacity-0'
        }`}
      >
        {/* cabecera */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2
              id={id('titulo')}
              className="text-xl font-extrabold tracking-tight text-[#211713]"
            >
              {titulo}
            </h2>
            <p id={id('descripcion')} className="mt-1 text-sm text-[#7A6E65]">
              {descripcion}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className={`-mt-1 -mr-1 cursor-pointer rounded-lg p-2 text-[#7A6E65] transition hover:bg-[#EFEAE6] hover:text-[#211713] ${focoVisible}`}
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {lectura ? (
          /* consulta datos de solo lectura */
          <div>
            <dl className="flex flex-col gap-4">
              <Dato etiqueta="Nombre completo">{cliente?.nombre}</Dato>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Dato etiqueta="Cédula">
                  {cliente?.cedula && (
                    <span className="tabular-nums">{cliente.cedula}</span>
                  )}
                </Dato>
                <Dato etiqueta="Teléfono">
                  {cliente?.telefono && (
                    <a
                      href={`tel:${String(cliente.telefono).replace(/\s/g, '')}`}
                      className={`tabular-nums text-[#C23B1F] underline-offset-2 hover:underline ${focoVisible}`}
                    >
                      {cliente.telefono}
                    </a>
                  )}
                </Dato>
              </div>
              <Dato etiqueta="Dirección">{cliente?.direccion}</Dato>
            </dl>

            <div className="mt-6 flex justify-end gap-2 border-t border-[#EFEAE6] pt-5">
              <button
                type="button"
                onClick={onClose}
                autoFocus
                className={`cursor-pointer rounded-xl px-4 py-2.5 text-sm font-bold text-[#7A6E65] transition hover:bg-[#EFEAE6] hover:text-[#211713] ${focoVisible}`}
              >
                Cerrar
              </button>
              {onEditar && (
                <button
                  type="button"
                  onClick={onEditar}
                  className={`cursor-pointer rounded-xl bg-[#C23B1F] px-4 py-2.5 text-sm font-bold text-white shadow-[0_8px_18px_-8px_#C23B1F] transition hover:bg-[#A83118] active:translate-y-px ${focoVisible}`}
                >
                  Editar
                </button>
              )}
            </div>
          </div>
        ) : (
          /* form de crear o editar */
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor={id('nombre')} className={claseLabel}>
                Nombre completo
              </label>
              <input
                id={id('nombre')}
                type="text"
                name="nombre"
                required
                autoFocus
                autoComplete="name"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="John Doe"
                className={claseInput}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={id('cedula')} className={claseLabel}>
                  Cédula
                </label>
                <input
                  id={id('cedula')}
                  type="text"
                  name="cedula"
                  inputMode="numeric"
                  value={formData.cedula}
                  onChange={handleChange}
                  placeholder="31560000"
                  className={`${claseInput} tabular-nums`}
                />
              </div>

              <div>
                <label htmlFor={id('telefono')} className={claseLabel}>
                  Teléfono
                </label>
                <input
                  id={id('telefono')}
                  type="tel"
                  name="telefono"
                  required
                  autoComplete="tel"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="04120000000"
                  className={`${claseInput} tabular-nums`}
                />
              </div>
            </div>

            <div>
              <label htmlFor={id('direccion')} className={claseLabel}>
                Dirección
              </label>
              <input
                id={id('direccion')}
                type="text"
                name="direccion"
                autoComplete="street-address"
                value={formData.direccion}
                onChange={handleChange}
                placeholder="Urb. Las Flores"
                className={claseInput}
              />
            </div>

            {/* botones */}
            <div className="mt-2 flex justify-end gap-2 border-t border-[#EFEAE6] pt-5">
              <button
                type="button"
                onClick={onClose}
                className={`cursor-pointer rounded-xl px-4 py-2.5 text-sm font-bold text-[#7A6E65] transition hover:bg-[#EFEAE6] hover:text-[#211713] ${focoVisible}`}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className={`cursor-pointer rounded-xl bg-[#C23B1F] px-4 py-2.5 text-sm font-bold text-white shadow-[0_8px_18px_-8px_#C23B1F] transition hover:bg-[#A83118] active:translate-y-px ${focoVisible}`}
              >
                {editando ? 'Guardar cambios' : 'Registrar cliente'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}