import { apiClient } from '../../../api/apiClient';

export const clientesService = {
  obtenerTodos: () => apiClient.get('/clientes'),
  crear: (datos) => apiClient.post('/clientes', datos),
  actualizar: (id, datos) => apiClient.put(`/clientes/${id}`, datos),
  eliminar: (id) => apiClient.delete(`/clientes/${id}`),
};