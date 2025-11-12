import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_super_seguro_cambialo';
const JWT_EXPIRES_IN = '30d';

// Generar token JWT
export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Verificar token JWT
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Token inválido o expirado');
  }
};

// Decodificar token sin verificar (útil para debugging)
export const decodeToken = (token) => {
  return jwt.decode(token);
};