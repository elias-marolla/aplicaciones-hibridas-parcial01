import axiosInstance from './axiosConfig';

export const authApi = {
  // Registro de usuario
  register: async (userData) => {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data;
  },

  // Login
  login: async (credentials) => {
    const response = await axiosInstance.post('/auth/login', credentials);
    return response.data;
  },

  // Obtener perfil
  getProfile: async () => {
    const response = await axiosInstance.get('/auth/profile');
    return response.data;
  },

  // Verificar token
  verifyToken: async () => {
    const response = await axiosInstance.get('/auth/verify');
    return response.data;
  },
};