import UserModel from "../models/userModel.js";

// Obtener todos los usuarios
const getUsers = async (req , res ) => {
    try {
        const users = await UserModel.find();
        res.status(200).json({message: "Usuarios encontrados.", data: users });
    } catch (error) {
        res.status(500).json({message: "no se pudo obtener usuarios."})
    }
}

// Crear un nuevo usuario
const postUser = async (req , res ) => {
    try {
        const {name, email, password} = req.body;
        const user = new UserModel({name, email, password});
        user.save();
        res.status(201).json({message:"Se creo un nuevo usuario"})
    } catch (error) {
        res.status(500).json({message:"No se pudo generar el nuevo usuario."})
    }
}

// Obtener un usuario por ID
const getUserById = async (req , res ) => {
    try{
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            res.status(404).json({message: "Usuario no encontrado"})
        }
        res.status(200).json(user);
    } catch (error){
        console.error (error);
        res.status(500).json({message: "Error al obtener usuario"});
    }
}
// Eliminar un usuario
const deleteUser = async (req , res ) => {
    try {
        const { id } = req.params;
        const deleted = await CategoriaModel.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json({ message: "Usuario eliminado" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar usuario" });
    }
}

// Actualizar un usuario
const putUser = async (req, res) =>{
    try {
        const {id} = req.params;
        const updated = await UserModel.findByIdAndUpdate(id, req.body, { new : true});
        if(!updated) {
           return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json({ message: "Usuario actualizado", data: updated });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar usuario" });
    }
}

export {getUsers, postUser, getUserById, deleteUser, putUser};