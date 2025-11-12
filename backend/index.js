import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import connectDB from "./config/db.js";
import routerApi from "./routes/index.js";

dotenv.config();
const PORT = process.env.PORT || 3030;

// Conexión a la base de datos
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/", express.static(path.join(__dirname, "views")));

// Endpoints de la API
routerApi(app);

// Ruta de prueba
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API funcionando correctamente' });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Levantamos el servidor
app.listen(PORT, () => {
  console.log(`API levantada en http://localhost:${PORT}`);
});