import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categoriaSchema = new Schema({
    nombre: { type: String, required: true, unique: true },
    descripcion: { type: String }
}, { timestamps: true });

const CategoriaModel = mongoose.model("Categoria", categoriaSchema);

export default CategoriaModel;
