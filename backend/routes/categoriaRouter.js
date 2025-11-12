import express from "express";
import {
    getCategorias,
    getCategoriaById,
    postCategoria,
    putCategoria,
    deleteCategoria
} from "../controllers/categoriaController.js";
import { validateCategoria } from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.get("/", getCategorias);
router.get("/:id", getCategoriaById);
router.post("/", validateCategoria, postCategoria);
router.put("/:id", validateCategoria, putCategoria);
router.delete("/:id", deleteCategoria);

export default router;