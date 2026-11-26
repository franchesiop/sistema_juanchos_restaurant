const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

async function request(endpoint, options = {}) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  // respuesta vacia
  if (response.status === 204) {
    return null;
  }

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    // si Laravel devuelve errores de validación ($request->validate) toma el primero
    const primerError = payload.errors
      ? Object.values(payload.errors).flat()[0]
      : null;

    throw new Error(primerError || payload.message || `Error HTTP ${response.status}`);
  }

  // si laravel envuelve el recurso en { data: ... } lo devuelve directo
  return payload.data !== undefined ? payload.data : payload;
}

export const apiClient = {
  get: (endpoint) => request(endpoint, { method: 'GET' }),
  post: (endpoint, body) =>
    request(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint, body) =>
    request(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
};