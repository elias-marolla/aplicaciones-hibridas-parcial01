import express from 'express';
import { 
  register, 
  login, 
  getProfile, 
  verifyAuth 
} from '../controllers/authController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { 
  validateUserRegistration, 
  validateLogin 
} from '../middlewares/validationMiddleware.js';

const router = express.Router();

// Rutas públicas
router.post('/register', validateUserRegistration, register);
router.post('/login', validateLogin, login);

// Rutas protegidas (requieren autenticación)
router.get('/profile', authenticate, getProfile);
router.get('/verify', authenticate, verifyAuth);

export default router;