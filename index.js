import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routerApi from "./routes/index.js";

dotenv.config();
const PORT = process.env.PORT;
const URI_DB = process.env.URI_DB;
const app = express();

mongoose.connect(URI_DB);
const db = mongoose.connection;
db.on('error', ()=>{console.error('no se genero la conexion con la base de datos.')});
db.once('open', () => {console.info('se establecio la conexion con la base de datos.')});
