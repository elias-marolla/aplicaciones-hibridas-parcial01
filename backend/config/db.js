import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URI_DB);
    console.log("✅ Conexión a MongoDB establecida");
  } catch (error) {
    console.error("❌ Error al conectar con MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;