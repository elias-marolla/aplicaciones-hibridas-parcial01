import UserModel from "../models/userModel.js";


const getUsers = async (req , res ) => {
    try {
        const users = await UserModel.find();
        res.status(200).json({message: 'Usuarios encontrados.', data: users });
    } catch (error) {
        res.status(500).json({message: 'no se pudo obtener usuarios.'})
    }
}

const postUser = async (req , res ) => {
    try {
        const {name, email, password} = req.body;
        const user = new UserModel({name, email, password});
        user.save();
        res.status(201).json({message:'Se creo un nuevo usuario'})
    } catch (error) {
        res.status(500).json({message:'No se pudo generar el nuevo usuario.'})
    }
}

export {getUsers, postUser}