// Validar datos de registro de usuario
export const validateUserRegistration = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push("El nombre debe tener al menos 2 caracteres");
  }

  if (!email || !isValidEmail(email)) {
    errors.push("Email inválido");
  }

  if (!password || password.length < 6) {
    errors.push("La contraseña debe tener al menos 6 caracteres");
  }

  if (errors.length > 0) {
    return res.status(400).json({ 
      message: "Errores de validación", 
      errors 
    });
  }

  next();
};

// Validar datos de login
export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || !isValidEmail(email)) {
    errors.push("Email inválido");
  }

  if (!password) {
    errors.push("La contraseña es requerida");
  }

  if (errors.length > 0) {
    return res.status(400).json({ 
      message: "Errores de validación", 
      errors 
    });
  }

  next();
};

// Validar datos de alimento
export const validateAlimento = (req, res, next) => {
  const { nombre, calorias, proteinas, carbohidratos, grasas } = req.body;
  const errors = [];

  if (!nombre || nombre.trim().length < 2) {
    errors.push("El nombre del alimento debe tener al menos 2 caracteres");
  }

  if (calorias === undefined || calorias < 0) {
    errors.push("Las calorías deben ser un número positivo");
  }

  if (proteinas === undefined || proteinas < 0) {
    errors.push("Las proteínas deben ser un número positivo");
  }

  if (carbohidratos === undefined || carbohidratos < 0) {
    errors.push("Los carbohidratos deben ser un número positivo");
  }

  if (grasas === undefined || grasas < 0) {
    errors.push("Las grasas deben ser un número positivo");
  }

  if (errors.length > 0) {
    return res.status(400).json({ 
      message: "Errores de validación", 
      errors 
    });
  }

  next();
};

// Validar datos de categoría
export const validateCategoria = (req, res, next) => {
  const { nombre, descripcion } = req.body;
  const errors = [];

  if (!nombre || nombre.trim().length < 2) {
    errors.push("El nombre de la categoría debe tener al menos 2 caracteres");
  }

  if (!descripcion || descripcion.trim().length < 5) {
    errors.push("La descripción debe tener al menos 5 caracteres");
  }

  if (errors.length > 0) {
    return res.status(400).json({ 
      message: "Errores de validación", 
      errors 
    });
  }

  next();
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};