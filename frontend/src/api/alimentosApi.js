import axiosInstance from './axiosConfig';

export const alimentosApi = {
  // Obtener todos los alimentos
  getAll: async () => {
    const response = await axiosInstance.get('/alimentos');
    return response.data;
  },

  // Obtener alimento por ID
  getById: async (id) => {
    const response = await axiosInstance.get(`/alimentos/${id}`);
    return response.data;
  },

  // Crear alimento
  create: async (alimentoData) => {
    const response = await axiosInstance.post('/alimentos', alimentoData);
    return response.data;
  },

  // Actualizar alimento
  update: async (id, alimentoData) => {
    const response = await axiosInstance.put(`/alimentos/${id}`, alimentoData);
    return response.data;
  },

  // Eliminar alimento
  delete: async (id) => {
    const response = await axiosInstance.delete(`/alimentos/${id}`);
    return response.data;
  },

  // Buscar alimentos
  search: async (nombre) => {
    const response = await axiosInstance.get(`/alimentos/search?nombre=${nombre}`);
    return response.data;
  },

  // Filtrar alimentos
  filter: async (filters) => {
    const params = new URLSearchParams(filters);
    const response = await axiosInstance.get(`/alimentos/filter?${params}`);
    return response.data;
  },
};