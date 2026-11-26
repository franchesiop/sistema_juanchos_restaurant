import { Phone, Pencil, Trash2, RefreshCw } from 'lucide-react';

const TONOS_AVATAR = [
  'bg-[#C23B1F] text-white',
  'bg-[#211713] text-white',
  'bg-[#6B6A2E] text-white',
  'bg-[#B9791A] text-white',
  'bg-[#6E3A4E] text-white',
];

const tonoDe = (nombre) =>
  TONOS_AVATAR[(nombre.trim().charCodeAt(0) || 0) % TONOS_AVATAR.length];

const focoVisible =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C23B1F]';

export function ClientesTable({
  clientes,
  totalClientes,
  busqueda,
  cargando,
  error,
  resaltadoId,
  onRecargar,
  onLimpiarBusqueda,
  onVer,
  onEditar,
  onEliminar,
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#E6DFD9] bg-white shadow-[0_1px_0_#E6DFD9]">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-[#E6DFD9] bg-[#FAF8F6] text-xs font-semibold text-[#7A6E65]">
            <th scope="col" className="px-5 py-3.5">Cliente</th>
            <th scope="col" className="px-5 py-3.5">Cédula</th>
            <th scope="col" className="px-5 py-3.5">Dirección</th>
            <th scope="col" className="px-5 py-3.5">Teléfono</th>
            <th scope="col" className="px-5 py-3.5 text-right">Acciones</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-[#EFEAE6]">
          {cargando ? (
            <tr>
              <td colSpan={5} className="px-5 py-14 text-center text-sm text-[#7A6E65]">
                Cargando directorio de clientes...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan={5} className="px-5 py-14 text-center">
                <p className="text-sm font-bold text-[#211713]">
                  Sin conexión con el servidor
                </p>
                <p className="mt-1 text-sm text-[#7A6E65]">{error}</p>
                <button
                  type="button"
                  onClick={onRecargar}
                  className={`mt-4 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#E6DFD9] px-3.5 py-2 text-sm font-semibold text-[#211713] transition hover:bg-[#FAF8F6] ${focoVisible}`}
                >
                  <RefreshCw size={15} />
                  Reintentar
                </button>
              </td>
            </tr>
          ) : (
            <>
              {clientes.map((cliente) => (
                <tr
                  key={cliente.id}
                  id={`cliente-${cliente.id}`}
                  className={`group transition-colors duration-500 ${
                    cliente.id === resaltadoId
                      ? 'bg-[#C23B1F]/10'
                      : 'hover:bg-[#FAF8F6]'
                  }`}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-extrabold ${tonoDe(cliente.nombre)}`}
                      >
                        {cliente.nombre.trim().charAt(0).toUpperCase()}
                      </span>
                      <button
                        type="button"
                        title="Ver datos"
                        aria-label={`Ver datos de ${cliente.nombre}`}
                        onClick={() => onVer(cliente)}
                        className={`cursor-pointer rounded text-left font-bold text-[#211713] underline-offset-4 transition hover:text-[#C23B1F] hover:underline ${focoVisible}`}
                      >
                        {cliente.nombre}
                      </button>
                    </div>
                  </td>

                  <td className="px-5 py-3.5 font-medium text-[#524841] tabular-nums">
                    {cliente.cedula || <span className="text-[#9C8F85]">—</span>}
                  </td>

                  <td className="max-w-xs px-5 py-3.5">
                    <div
                      className="truncate text-[#524841]"
                      title={cliente.direccion}
                    >
                      {cliente.direccion || <span className="text-[#9C8F85]">—</span>}
                    </div>
                  </td>

                  <td className="px-5 py-3.5">
                    <a
                      href={`tel:${String(cliente.telefono).replace(/\s/g, '')}`}
                      className={`inline-flex items-center gap-1.5 rounded-full bg-[#C23B1F]/10 px-3 py-1 text-xs font-bold text-[#C23B1F] tabular-nums transition hover:bg-[#C23B1F] hover:text-white ${focoVisible}`}
                    >
                      <Phone size={12} strokeWidth={2.2} aria-hidden="true" />
                      {cliente.telefono}
                    </a>
                  </td>

                  <td className="px-5 py-3.5 text-right">
                    <div className="inline-flex items-center gap-1 opacity-100 transition-opacity md:opacity-40 md:group-focus-within:opacity-100 md:group-hover:opacity-100">
                      <button
                        type="button"
                        title="Editar"
                        aria-label={`Editar a ${cliente.nombre}`}
                        onClick={() => onEditar(cliente)}
                        className={`cursor-pointer rounded-lg p-2 text-[#7A6E65] transition hover:bg-[#EFEAE6] hover:text-[#211713] ${focoVisible}`}
                      >
                        <Pencil size={16} strokeWidth={1.9} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        title="Eliminar"
                        aria-label={`Eliminar a ${cliente.nombre}`}
                        onClick={() => onEliminar(cliente)}
                        className={`cursor-pointer rounded-lg p-2 text-[#7A6E65] transition hover:bg-red-50 hover:text-red-600 ${focoVisible}`}
                      >
                        <Trash2 size={16} strokeWidth={1.9} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {clientes.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-14 text-center">
                    <p className="text-sm font-bold text-[#211713]">
                      {totalClientes === 0
                        ? 'Aún no hay clientes'
                        : `Ningún cliente coincide con “${busqueda}”`}
                    </p>
                    <p className="mt-1 text-sm text-[#7A6E65]">
                      {totalClientes === 0
                        ? 'Agrega el primero con el botón Nuevo cliente.'
                        : 'Revisa la ortografía o busca por cédula o teléfono.'}
                    </p>
                    {busqueda && (
                      <button
                        type="button"
                        onClick={onLimpiarBusqueda}
                        className={`mt-4 cursor-pointer rounded-lg border border-[#E6DFD9] px-3.5 py-2 text-sm font-semibold text-[#211713] transition hover:bg-[#FAF8F6] ${focoVisible}`}
                      >
                        Limpiar búsqueda
                      </button>
                    )}
                  </td>
                </tr>
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}