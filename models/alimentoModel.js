import mongoose from "mongoose";

const Schema = mongoose.Schema;

const alimentoSchema = new Schema(
  {
    nombre: { type: String, required: true, unique: true },
    calorias: { type: Number, required: true },
    proteinas: { type: Number },       
    carbohidratos: { type: Number },   
    grasas: { type: Number },          
    descripcion: { type: String },
    categoria: {
      type: Schema.Types.ObjectId,   // almacena el id de la categoría
      ref: "Categoria",          
    }
  },
  { timestamps: true }
);

const AlimentoModel = mongoose.model("Alimento", alimentoSchema);

export default AlimentoModel;
