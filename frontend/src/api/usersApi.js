import axiosInstance from './axiosConfig';

export const usersApi = {
  // Obtener todos los usuarios
  getAll: async () => {
    const response = await axiosInstance.get('/users');
    return response.data;
  },

  // Obtener usuario por ID
  getById: async (id) => {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  },

  // Actualizar usuario
  update: async (id, userData) => {
    const response = await axiosInstance.put(`/users/${id}`, userData);
    return response.data;
  },

  // Eliminar usuario
  delete: async (id) => {
    const response = await axiosInstance.delete(`/users/${id}`);
    return response.data;
  },
};