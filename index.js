import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routerApi from "./routes/index.js"
dotenv.config();
const port = process.env.PORT;