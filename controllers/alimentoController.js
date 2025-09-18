import AlimentoModel from "../models/alimentoModel.js";

//Obtener todos los alimentos
const getAlimentos = async (req, res) => {
    try {
        const alimentos = await AlimentoModel.find();
        res.status(200).json(alimentos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener alimentos" });
    }
};

//Obtener alimento por ID
const getAlimentoById = async (req, res) => {
    try {
        const alimento = await AlimentoModel.findById(req.params.id);
        if (!alimento) {
            return res.status(404).json({ menssage: "Alimento no encontrado" });
        }
        res.status(200).json(alimento);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el alimento" });
    }
}


//Crear un nuevo alimento
const postAlimento = async (req, res) => {
    try {
        const alimento = new AlimentoModel(req.body);
        await alimento.save();
        res.status(201).json({ message: "Alimento creado correctamente" });
    } catch (error) {
        res.status(400).json({ message: "Error al crear el alimento" });
    }
};

//Actualizar un alimento
const putAlimento = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await AlimentoModel.findByIdAndUpdate(id, req.body, { new: true })
        if (!updated) {
            return res.status(404).json({ message: "Alimento no encontrado" });
        }
        res.status(200).json({ message: "Alimento actualizado", data: updated });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el alimento" });
    }
};

//Eliminar una categoria
const deleteAlimento = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await AlimentoModel.findOneAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Alimento no encontrado" });
        }
        res.status(200).json({ message: "Alimento eliminado" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el alimento" });
    }
}

export {getAlimentoById, getAlimentos, postAlimento, putAlimento, deleteAlimento}