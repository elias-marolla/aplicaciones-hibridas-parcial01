import axiosInstance from './axiosConfig';

export const categoriasApi = {
  // Obtener todas las categorías
  getAll: async () => {
    const response = await axiosInstance.get('/categorias');
    return response.data;
  },

  // Obtener categoría por ID
  getById: async (id) => {
    const response = await axiosInstance.get(`/categorias/${id}`);
    return response.data;
  },

  // Crear categoría
  create: async (categoriaData) => {
    const response = await axiosInstance.post('/categorias', categoriaData);
    return response.data;
  },

  // Actualizar categoría
  update: async (id, categoriaData) => {
    const response = await axiosInstance.put(`/categorias/${id}`, categoriaData);
    return response.data;
  },

  // Eliminar categoría
  delete: async (id) => {
    const response = await axiosInstance.delete(`/categorias/${id}`);
    return response.data;
  },
};