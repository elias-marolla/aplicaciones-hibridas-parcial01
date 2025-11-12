import userRouter from './userRouter.js';
import alimentoRouter from "./alimentoRouter.js";
import categoriaRouter from "./categoriaRouter.js";
import authRouter from "./authRouter.js";
import { authenticate } from '../middlewares/authMiddleware.js';

const routerAPI = (app) => {
  // Rutas públicas
  app.use('/api/auth', authRouter);
  
  // Rutas protegidas (requieren autenticación)
  app.use('/api/users', authenticate, userRouter);
  app.use("/api/alimentos", authenticate, alimentoRouter);
  app.use("/api/categorias", authenticate, categoriaRouter);
}

export default routerAPI;