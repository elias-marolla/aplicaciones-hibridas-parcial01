import CategoriaModel from "../models/categoriaModel.js";

// Obtener todas las categorías
const getCategorias = async (req, res) => {
    try {
        const categorias = await CategoriaModel.find();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener categorías" });
    }
};

// Obtener una categoría por ID
const getCategoriaById = async (req, res) => {
    try {
        const categoria = await CategoriaModel.findById(req.params.id);
        if (!categoria) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }
        res.status(200).json(categoria);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la categoría" });
    }
};

// Crear una nueva categoría
const postCategoria = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        if( !nombre || !descripcion ) {
            return res.status(400).json({ message: "Se requiere el nombre y la descripción" });
        }

        const categoriaData = await CategoriaModel.findOne({ nombre });
        if (categoriaData) {
            return res.status(400).json({ message: "La categoría ya existe" });
        }
        const categoria = new CategoriaModel({ nombre, descripcion });
        await categoria.save();
        res.status(201).json({ message: "Categoría creada correctamente", data: categoria });
    } catch (error) {
        res.status(500).json({ message: "Error al crear categoría" });
        console.error(error);
    }
};

// Actualizar una categoría
const putCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await CategoriaModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }
        res.status(200).json({ message: "Categoría actualizada", data: updated });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar categoría" });
    }
};

// Eliminar una categoría
const deleteCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await CategoriaModel.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }
        res.status(200).json({ message: "Categoría eliminada" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar categoría" });
    }
};

export { getCategorias, getCategoriaById, postCategoria, putCategoria, deleteCategoria };
