import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../services/jwtService.js";

// Registro de usuario
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        message: "El email ya está registrado" 
      });
    }

    // Hashear contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crear usuario
    const user = new UserModel({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    // Generar token
    const token = generateToken({ 
      userId: user._id, 
      email: user.email 
    });

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt
        },
        token
      }
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ 
      message: "Error al registrar usuario",
      error: error.message 
    });
  }
};

// Login de usuario
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        message: "Credenciales inválidas" 
      });
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        message: "Credenciales inválidas" 
      });
    }

    // Generar token
    const token = generateToken({ 
      userId: user._id, 
      email: user.email 
    });

    // Responder con usuario y token
    res.status(200).json({
      message: "Login exitoso",
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email
        },
        token
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ 
      message: "Error al iniciar sesión",
      error: error.message 
    });
  }
};

// Obtener perfil del usuario autenticado
export const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      message: "Perfil obtenido exitosamente",
      data: req.user
    });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ 
      message: "Error al obtener perfil",
      error: error.message 
    });
  }
};

// Verificar token
export const verifyAuth = async (req, res) => {
  try {
    // el token es válido
    res.status(200).json({
      message: "Token válido",
      data: {
        user: req.user
      }
    });
  } catch (error) {
    res.status(401).json({ 
      message: "Token inválido" 
    });
  }
};