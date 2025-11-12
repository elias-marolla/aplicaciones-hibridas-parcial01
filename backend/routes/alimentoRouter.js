import express from "express";
import {
    getAlimentos,
    getAlimentoById,
    postAlimento,
    putAlimento,
    deleteAlimento,
    searchAlimentos,
    filterAlimentos
} from "../controllers/alimentoController.js";
import { validateAlimento } from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.get("/search", searchAlimentos);
router.get("/filter", filterAlimentos);
router.get("/", getAlimentos);
router.get("/:id", getAlimentoById);
router.post("/", validateAlimento, postAlimento);
router.put("/:id", validateAlimento, putAlimento);
router.delete("/:id", deleteAlimento);

export default router;