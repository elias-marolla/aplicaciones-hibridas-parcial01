import express from "express";
import {
    getAlimentos,
    getAlimentoById,
    postAlimento,
    putAlimento,
    deleteAlimento
} from "../controllers/alimentoController.js";

const router = express.Router();

router.get("/", getAlimentos);
router.get("/:id", getAlimentoById);
router.post("/", postAlimento);
router.put("/:id", putAlimento);
router.delete("/:id", deleteAlimento);

export default router;