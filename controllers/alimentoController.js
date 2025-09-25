import AlimentoModel from "../models/alimentoModel.js";

// Obtener todos los alimentos
const getAlimentos = async (req, res) => {
    try {
        const alimentos = await AlimentoModel.find();
        res.status(200).json({ message: "Alimentos encontrados", data: alimentos });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener alimentos" });
    }
};

// Obtener alimento por ID
const getAlimentoById = async (req, res) => {
    try {
        const alimento = await AlimentoModel.findById(req.params.id);
        if (!alimento) {
            return res.status(404).json({ message: "Alimento no encontrado" });
        }
        res.status(200).json(alimento);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el alimento" });
    }
};

// Crear un nuevo alimento
const postAlimento = async (req, res) => {
    try {
        const { nombre, calorias, proteinas, carbohidratos, grasas, descripcion } = req.body; 
        
        if (!nombre || !calorias || !proteinas || !carbohidratos || !grasas || !descripcion) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        // Verificar si ya existe un alimento con ese nombre
        const alimentoExistente = await AlimentoModel.findOne({ nombre });
        if (alimentoExistente) {
            return res.status(400).json({ message: 'El nombre seleccionado ya existe' });
        }

        const alimento = new AlimentoModel({ nombre, calorias, proteinas, carbohidratos, grasas, descripcion });
        await alimento.save();
        res.status(201).json({ message: "Alimento creado correctamente", data: alimento });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error al crear el alimento" });
    }
};

// Actualizar un alimento
const putAlimento = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await AlimentoModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) {
            return res.status(404).json({ message: "Alimento no encontrado" });
        }
        res.status(200).json({ message: "Alimento actualizado", data: updated });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el alimento" });
    }
};

// Eliminar un alimento
const deleteAlimento = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await AlimentoModel.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Alimento no encontrado" });
        }
        res.status(200).json({ message: "Alimento eliminado" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el alimento" });
    }
};

// Buscar alimentos por nombre
const searchAlimentos = async (req, res) => {
    try {
        const { nombre } = req.query;
        if (!nombre) {
            return res.status(400).json({ message: "El parámetro 'nombre' es requerido" });
        }
        
        const alimentos = await AlimentoModel.find({
            nombre: { $regex: nombre, $options: 'i' }
        });
        
        res.status(200).json({ 
            message: `Alimentos encontrados para "${nombre}"`, 
            data: alimentos,
            count: alimentos.length
        });
    } catch (error) {
        res.status(500).json({ message: "Error al buscar alimentos" });
    }
};

// Filtrar alimentos por valores nutricionales
const filterAlimentos = async (req, res) => {
    try {
        const { minCalorias, maxCalorias, minProteinas, maxProteinas, minCarbohidratos, maxCarbohidratos, minGrasas, maxGrasas } = req.query;
        
        let filter = {};
        // Filtros por calorías
        if (minCalorias || maxCalorias) {
            filter.calorias = {};
            if (minCalorias) filter.calorias.$gte = parseFloat(minCalorias);
            if (maxCalorias) filter.calorias.$lte = parseFloat(maxCalorias);
        }
        
        // Filtros por proteínas
        if (minProteinas || maxProteinas) {
            filter.proteinas = {};
            if (minProteinas) filter.proteinas.$gte = parseFloat(minProteinas);
            if (maxProteinas) filter.proteinas.$lte = parseFloat(maxProteinas);
        }
        
        // Filtros por carbohidratos
        if (minCarbohidratos || maxCarbohidratos) {
            filter.carbohidratos = {};
            if (minCarbohidratos) filter.carbohidratos.$gte = parseFloat(minCarbohidratos);
            if (maxCarbohidratos) filter.carbohidratos.$lte = parseFloat(maxCarbohidratos);
        }
        
        // Filtros por grasas
        if (minGrasas || maxGrasas) {
            filter.grasas = {};
            if (minGrasas) filter.grasas.$gte = parseFloat(minGrasas);
            if (maxGrasas) filter.grasas.$lte = parseFloat(maxGrasas);
        }
        
        const alimentos = await AlimentoModel.find(filter);
        
        res.status(200).json({ 
            message: "Alimentos filtrados", 
            data: alimentos,
            count: alimentos.length,
            filters: req.query
        });
    } catch (error) {
        res.status(500).json({ message: "Error al filtrar alimentos" });
    }
};

export { getAlimentoById, getAlimentos, postAlimento, putAlimento, deleteAlimento, searchAlimentos, filterAlimentos };