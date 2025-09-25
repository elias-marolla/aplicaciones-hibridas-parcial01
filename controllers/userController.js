import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";

// Obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find().select('-password'); 
        res.status(200).json({ message: "Usuarios encontrados.", data: users });
    } catch (error) {
        res.status(500).json({ message: "No se pudo obtener usuarios." });
    }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener usuario" });
    }
};

// Crear un nuevo usuario
const postUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "El email ya está registrado" });
        }
        
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = new UserModel({ 
            name, 
            email, 
            password: hashedPassword 
        });
        
        await user.save();
        
        // Responder sin incluir la contraseña hasheada
        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
        
        res.status(201).json({ 
            message: "Usuario creado correctamente", 
            data: userResponse 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "No se pudo generar el nuevo usuario." });
    }
};

// Actualizar un usuario
const putUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        // Hashear contraseña si se está actualizando
        if (updateData.password) {
            if (updateData.password.length < 6) {
                return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
            }
            const saltRounds = 10;
            updateData.password = await bcrypt.hash(updateData.password, saltRounds);
        }

        const updated = await UserModel.findByIdAndUpdate(id, updateData, { 
            new: true 
        }).select('-password');
        
        if (!updated) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        
        res.status(200).json({ message: "Usuario actualizado", data: updated });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar usuario" });
    }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await UserModel.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json({ message: "Usuario eliminado" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar usuario" });
    }
};

// Función para verificar contraseña
const verifyPassword = async (plainPassword, hashedPassword) => {
    try {
        return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
        console.error('Error al verificar contraseña:', error);
        return false;
    }
};

export { getUsers, getUserById, postUser, putUser, deleteUser, verifyPassword };