import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

// Rutas
import routerApi from "./routes/index.js";

dotenv.config();
const PORT = process.env.PORT || 3030;
const URI_DB = process.env.URI_DB;

// Conexión a la base de datos
mongoose
  .connect(URI_DB)
  .then(() => console.log("Conexión a MongoDB establecida"))
  .catch((err) => console.error("Error al conectar con MongoDB:", err));

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/", express.static(path.join(__dirname, "views")));

// Endpoints de la API
routerApi(app);

// Levantamos el servidor
app.listen(PORT, () => {
  console.log(`API levantada en http://localhost:${PORT}`);
});