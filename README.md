# Juanchos — Sistema de Gestión de Restaurante

Interfaz web para la administración operativa y comercial del restaurante **Juanchos**. Desarrollada con una arquitectura modular basada en *features*, lista para consumir una API REST en Laravel.

## Tecnologías

- **Frontend:** React + Vite
- **Estilos:** Tailwind CSS
- **Íconos:** Lucide React
- **Backend (API):** Laravel + MySQL *(en desarrollo)*

## Módulos del sistema

### Operación
- [ ] **Dashboard:** Resumen general y métricas del turno.
- [ ] **Pedidos:** Toma y gestión de órdenes en local y delivery.
- [ ] **Menú:** Administración de platos, combos y precios.
- [ ] **Inventario:** Control de insumos y stock.

### Gestión
- [x] **Clientes:** Directorio con búsqueda en tiempo real, vista de consulta rápida y CRUD conectado a API REST.
- [ ] **Empleados:** Control de personal y roles.
- [ ] **Deliverys:** Seguimiento de repartidores y entregas.
- [ ] **Pagos:** Registro de transacciones y métodos de pago.
- [ ] **Reportes:** Estadísticas de ventas y rendimiento.

## Estructura del proyecto

```text
src/
├── api/
│   └── apiClient.js            # Cliente HTTP base (fetch) configurado para Laravel
├── componnents/
│   └── Sidebar.jsx             # Navegación lateral principal
├── features/
│   └── clientes/               # Módulo de clientes desacoplado por capas
│       ├── components/         # Tabla y modal de formulario/consulta
│       ├── hooks/              # Custom hook (useClientes) con estado y filtros
│       ├── services/           # Peticiones CRUD hacia /api/clientes
│       └── ClientesPage.jsx    # Vista principal del módulo
└── App.jsx
```

## Instalación y ejecución local

1. **Clonar el repositorio e instalar dependencias:**
   ```bash
   git clone [https://github.com/franchesiop/juanchos_sistema.git](https://github.com/franchesiop/juanchos_sistema.git)
   cd juanchos_sistema
   npm install
   ```

2. **Configurar variables de entorno:**
   Copia el archivo de ejemplo y ajusta la URL de tu servidor Laravel si es necesario:
   ```bash
   cp .env.example .env
   ```
   Contenido por defecto de `.env`:
   ```env
   VITE_API_URL=http://localhost:8000/api
   ```

3. **Levantar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

## Requisitos de la API (Laravel)

El frontend espera los siguientes endpoints estándar bajo el prefijo `/api`:

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `GET` | `/api/clientes` | Lista todos los clientes registrados |
| `POST` | `/api/clientes` | Registra un nuevo cliente |
| `PUT` | `/api/clientes/{id}` | Actualiza los datos de un cliente |
| `DELETE` | `/api/clientes/{id}` | Elimina un cliente (`204 No Content`) |