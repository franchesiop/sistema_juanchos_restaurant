import { useEffect, useRef, useState } from 'react';
import { Plus, Search, X, Check, AlertCircle } from 'lucide-react';
import { useClientes } from './hooks/useClientes';
import { ClientesTable } from './components/ClientesTable';
import { ClienteFormModal } from './components/ClienteFormModal';

const focoVisible =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C23B1F]';

export function ClientesPage() {
  const {
    clientes,
    clientesFiltrados,
    busqueda,
    setBusqueda,
    cargando,
    error,
    recargar,
    crearCliente,
    actualizarCliente,
    borrarCliente,
  } = useClientes();

  const [modalAbierto, setModalAbierto] = useState(false);
  const [clienteEditar, setClienteEditar] = useState(null);
  const [soloLectura, setSoloLectura] = useState(false);

  const disparadorRef = useRef(null);

  const [resaltadoId, setResaltadoId] = useState(null);
  const [aviso, setAviso] = useState({ texto: '', tipo: 'ok', visible: false });
  const temporizadores = useRef({ fila: null, aviso: null });

  useEffect(() => {
    const t = temporizadores.current;
    return () => {
      clearTimeout(t.fila);
      clearTimeout(t.aviso);
    };
  }, []);

  const mostrarAviso = (texto, tipo = 'ok') => {
    clearTimeout(temporizadores.current.aviso);
    setAviso({ texto, tipo, visible: true });
    temporizadores.current.aviso = setTimeout(
      () => setAviso((a) => ({ ...a, visible: false })),
      3200
    );
  };

  const resaltarFila = (id) => {
    clearTimeout(temporizadores.current.fila);
    setResaltadoId(id);
    temporizadores.current.fila = setTimeout(() => setResaltadoId(null), 1600);
  };

  useEffect(() => {
    if (resaltadoId == null) return;
    const fila = document.getElementById(`cliente-${resaltadoId}`);
    const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    fila?.scrollIntoView({ block: 'nearest', behavior: reducido ? 'auto' : 'smooth' });
  }, [resaltadoId]);

  const abrirModal = (cliente = null, lectura = false) => {
    disparadorRef.current = document.activeElement;
    setClienteEditar(cliente);
    setSoloLectura(lectura);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setClienteEditar(null);
    setSoloLectura(false);
    disparadorRef.current?.focus();
  };

  const guardarCliente = async (datos) => {
    try {
      if (clienteEditar) {
        const actualizado = await actualizarCliente(clienteEditar.id, datos);
        resaltarFila(actualizado.id);
        mostrarAviso('Cambios guardados');
      } else {
        const nuevo = await crearCliente(datos);
        resaltarFila(nuevo.id);
        mostrarAviso('Cliente registrado');
      }
    } catch (err) {
      mostrarAviso(err.message || 'No se pudo guardar el cliente', 'error');
    }
  };

  const eliminarCliente = async (cliente) => {
    if (!window.confirm(`¿Eliminar a ${cliente.nombre}? Esta acción no se puede deshacer.`)) {
      return;
    }
    try {
      await borrarCliente(cliente.id);
      mostrarAviso('Cliente eliminado');
    } catch (err) {
      mostrarAviso(err.message || 'No se pudo eliminar el cliente', 'error');
    }
  };

  return (
    <div className="flex flex-col gap-7">
      {/* encabezado del módulo */}
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#211713]">
            Clientes
          </h1>
          <p className="mt-1 max-w-prose text-sm text-[#7A6E65]">
            Directorio de clientes
          </p>
        </div>

        <button
          type="button"
          onClick={() => abrirModal()}
          className={`flex cursor-pointer items-center gap-2 rounded-xl bg-[#C23B1F] px-4 py-2.5 text-sm font-bold text-white shadow-[0_8px_18px_-8px_#C23B1F] transition hover:bg-[#A83118] active:translate-y-px ${focoVisible}`}
        >
          <Plus size={18} strokeWidth={2.2} aria-hidden="true" />
          Nuevo cliente
        </button>
      </header>

      {/* búsqueda y contador */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full max-w-md">
          <Search
            size={18}
            strokeWidth={1.9}
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[#9C8F85]"
          />

          <input
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre, cédula o teléfono"
            aria-label="Buscar clientes"
            className="w-full rounded-xl border border-[#E6DFD9] bg-[#FAF8F6] py-2.5 pr-10 pl-11 text-sm text-[#211713] placeholder-[#9C8F85] transition outline-none focus:border-[#C23B1F] focus:bg-white focus:ring-4 focus:ring-[#C23B1F]/10 [&::-webkit-search-cancel-button]:appearance-none"
          />

          {busqueda && (
            <button
              type="button"
              onClick={() => setBusqueda('')}
              aria-label="Limpiar búsqueda"
              className={`absolute top-1/2 right-2.5 flex h-6 w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-[#7A6E65] transition hover:bg-[#EFEAE6] hover:text-[#211713] ${focoVisible}`}
            >
              <X size={14} strokeWidth={2.4} aria-hidden="true" />
            </button>
          )}
        </div>

        <p className="text-sm text-[#7A6E65]" aria-live="polite">
          <span className="font-bold text-[#211713] tabular-nums">
            {clientesFiltrados.length}
          </span>{' '}
          de <span className="tabular-nums">{clientes.length}</span> clientes
        </p>
      </div>

      {/* tabla */}
      <ClientesTable
        clientes={clientesFiltrados}
        totalClientes={clientes.length}
        busqueda={busqueda}
        cargando={cargando}
        error={error}
        resaltadoId={resaltadoId}
        onRecargar={recargar}
        onLimpiarBusqueda={() => setBusqueda('')}
        onVer={(cliente) => abrirModal(cliente, true)}
        onEditar={(cliente) => abrirModal(cliente)}
        onEliminar={eliminarCliente}
      />

      {/* modal */}
      <ClienteFormModal
        isOpen={modalAbierto}
        onClose={cerrarModal}
        onSave={guardarCliente}
        clienteEditar={clienteEditar}
        soloLectura={soloLectura}
        onEditar={() => setSoloLectura(false)}
      />

      {/* aviso */}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center px-4"
      >
        <div
          className={`flex items-center gap-2.5 rounded-xl bg-[#211713] px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-12px_#211713] transition duration-300 ease-out motion-reduce:transition-none ${
            aviso.visible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
          }`}
        >
          <span
            aria-hidden="true"
            className={`flex h-5 w-5 items-center justify-center rounded-full ${
              aviso.tipo === 'error' ? 'bg-[#C23B1F]' : 'bg-[#6B6A2E]'
            }`}
          >
            {aviso.tipo === 'error' ? (
              <AlertCircle size={12} strokeWidth={3} />
            ) : (
              <Check size={12} strokeWidth={3} />
            )}
          </span>
          {aviso.texto}
        </div>
      </div>
    </div>
  );
}