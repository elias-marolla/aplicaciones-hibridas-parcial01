import { verifyToken } from "../services/jwtService.js";
import UserModel from "../models/userModel.js";

// Middleware para verificar autenticación
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        message: "No autorizado. Token no proporcionado" 
      });
    }

    const token = authHeader.split(' ')[1];

    // Verificar token
    const decoded = verifyToken(token);

    // Buscar usuario
    const user = await UserModel.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ 
        message: "Usuario no encontrado" 
      });
    }

    // Agregar usuario al request
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ 
      message: "Token inválido o expirado",
      error: error.message 
    });
  }
};

// verificar rol de administrador
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ 
      message: "Acceso denegado. Se requieren permisos de administrador" 
    });
  }
};