import userRouter from './userRouter.js';
import alimentoRouter from "./alimentoRouter.js";
import categoriaRouter from "./categoriaRouter.js";

const routerAPI =  (app) =>{
    app.use('/api/users', userRouter);
    app.use("/api/alimentos", alimentoRouter);
    app.use("/api/categorias", categoriaRouter);
}

export default routerAPI;