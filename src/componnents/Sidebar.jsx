{/* arreglo de objetos*/}
const menuSections = [
  {
    title: 'OPERACIÓN',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="2" />
            <rect x="14" y="3" width="7" height="7" rx="2" />
            <rect x="3" y="14" width="7" height="7" rx="2" />
            <rect x="14" y="14" width="7" height="7" rx="2" />
          </svg>
        ),
      },
      {
        id: 'pedidos',
        label: 'Pedidos',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
            <path d="M9 8h6M9 12h6" />
          </svg>
        ),
      },
      {
        id: 'menu',
        label: 'Menú',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 14a4 4 0 1 1 1-7.9A4 4 0 0 1 16 6a4 4 0 0 1 1 8" />
            <path d="M7 14v6h10v-6" />
          </svg>
        ),
      },
      {
        id: 'inventario',
        label: 'Inventario',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 8l-9-5-9 5 9 5z" />
            <path d="M3 8v8l9 5 9-5V8" />
            <path d="M12 13v8" />
          </svg>
        ),
      },
    ],
  },
  {
    title: 'GESTIÓN',
    items: [
      {
        id: 'empleados',
        label: 'Empleados',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="8" r="3.5" />
            <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
            <circle cx="17.5" cy="9" r="2.5" />
            <path d="M17 14.2c2.7.2 4.5 2.2 4.5 5" />
          </svg>
        ),
      },
      {
        id: 'clientes',
        label: 'Clientes',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
          </svg>
        ),
      },
      {
        id: 'deliverys',
        label: 'Deliverys',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="6" cy="17" r="3" />
            <circle cx="18" cy="17" r="3" />
            <path d="M6 17l4-8h5l3 8" />
            <path d="M10 9H7" />
          </svg>
        ),
      },
      {
        id: 'pagos',
        label: 'Pagos',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2.5" y="5" width="19" height="14" rx="3" />
            <path d="M2.5 10h19M6.5 15h4" />
          </svg>
        ),
      },
      {
        id: 'reportes',
        label: 'Reportes',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="11" width="3.5" height="9" rx="1" />
            <rect x="10.25" y="6" width="3.5" height="14" rx="1" />
            <rect x="15.5" y="13" width="3.5" height="7" rx="1" />
          </svg>
        ),
      },
    ],
  },
];

export function Sidebar({ activeTab = 'dashboard', onSelectTab = () => {} }) {
  return (
    <aside className="flex w-[236px] shrink-0 flex-col">
      <nav
        aria-label="Módulos"
        className="flex flex-1 flex-col gap-[3px] rounded-[22px] bg-[#211713] bg-[radial-gradient(120%_60%_at_0%_0%,rgba(194,59,31,0.24),transparent_60%)] px-2.5 pt-3.5 pb-2.5 text-white"
      >
        {/* cabecera con logo y nombre */}
        <div className="flex items-center gap-2.5 px-1.5 pt-0.5 pb-3">
          <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-xl bg-[#C23B1F] text-xl font-extrabold text-white shadow-[0_8px_18px_-8px_#C23B1F]">
            J
          </div>
          <div>
            <div className="text-lg leading-[1.1] font-extrabold tracking-tight">
              Juanchos
            </div>
            <div className="text-[11px] text-[#B8A99C]">
              Gestión del restaurante
            </div>
          </div>
        </div>

        {/* enlaces de navegación */}
        {menuSections.map((section) => (
          <div key={section.title} className="flex flex-col gap-[3px]">
            <div className="px-3 pt-2 pb-[3px] text-[10px] font-bold tracking-[0.1em] text-[#A8998C]">
              {section.title}
            </div>

            {section.items.map((item) => {
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectTab(item.id)}
                  className={`group flex w-full cursor-pointer items-center gap-2.5 rounded-[11px] px-[11px] py-[7px] text-left text-[13.5px] font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#C23B1F] text-white shadow-[0_6px_16px_-6px_#C23B1F]'
                      : 'bg-transparent text-[#D9CCC0] hover:translate-x-0.5 hover:bg-white/[0.07] hover:text-white'
                  }`}
                >
                  <span
                    className={`flex transition-transform duration-200 ${
                      isActive
                        ? 'text-white'
                        : 'text-[#B8A99C] group-hover:scale-108 group-hover:text-white'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        ))}

        {/* empuja el bloque de perfil al fondo */}
        <div className="min-h-[6px] flex-1" />

        {/* estado del local */}
        <div className="mx-1 mb-2 flex items-center gap-2 rounded-xl bg-white/[0.06] px-3 py-2 text-xs font-semibold text-[#E9DED4]">
          <span className="h-[7px] w-[7px] shrink-0 animate-pulse rounded-full bg-[#3FB978]" />
          <span>Local abierto · Turno noche</span>
        </div>

        {/* perfil de usuario */}
        <div className="flex items-center gap-1.5 border-t border-white/10 pt-2">
          <button
            type="button"
            aria-label="Perfil de Juan Pérez"
            className="flex min-w-0 flex-1 cursor-pointer items-center gap-2.5 rounded-[13px] p-1.5 text-left text-white transition hover:bg-white/[0.07]"
          >
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#F4A261] to-[#C23B1F] text-[13px] font-extrabold">
              JP
              <span className="absolute -right-[1px] -bottom-[1px] h-2.5 w-2.5 rounded-full border-2 border-[#211713] bg-[#3FB978]" />
            </span>

            <span className="min-w-0">
              <span className="block truncate text-[13px] font-bold">
                Juan Pérez
              </span>
              <span className="block text-[11px] text-[#B8A99C]">
                Administrador
              </span>
            </span>
          </button>

          <button
            type="button"
            aria-label="Configuración"
            className="group flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-[11px] bg-white/[0.07] text-[#D9CCC0] transition hover:bg-white/[0.14] hover:text-white"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-500 group-hover:rotate-90"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
            </svg>
          </button>
        </div>
      </nav>
    </aside>
  );
}