import { useCallback, useEffect, useMemo, useState } from 'react';
import { clientesService } from '../services/clientesService';

const normalizar = (texto) =>
  String(texto ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

export function useClientes() {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargarClientes = useCallback(async () => {
    try {
      setCargando(true);
      setError(null);
      const lista = await clientesService.obtenerTodos();
      setClientes(Array.isArray(lista) ? lista : []);
    } catch (err) {
      setError(err.message || 'No se pudo conectar con el servidor');
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarClientes();
  }, [cargarClientes]);

  const crearCliente = async (datos) => {
    const creado = await clientesService.crear(datos);
    setClientes((prev) => [...prev, creado]);
    return creado;
  };

  const actualizarCliente = async (id, datos) => {
    const actualizado = await clientesService.actualizar(id, datos);
    setClientes((prev) =>
      prev.map((c) => (c.id === id ? actualizado : c))
    );
    return actualizado;
  };

  const borrarCliente = async (id) => {
    await clientesService.eliminar(id);
    setClientes((prev) => prev.filter((c) => c.id !== id));
  };

  const clientesFiltrados = useMemo(() => {
    const q = normalizar(busqueda.trim());
    if (!q) return clientes;
    return clientes.filter(
      (c) =>
        normalizar(c.nombre).includes(q) ||
        String(c.cedula ?? '').includes(q) ||
        String(c.telefono ?? '').includes(q)
    );
  }, [clientes, busqueda]);

  return {
    clientes,
    clientesFiltrados,
    busqueda,
    setBusqueda,
    cargando,
    error,
    recargar: cargarClientes,
    crearCliente,
    actualizarCliente,
    borrarCliente,
  };
}