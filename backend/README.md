# 🔧 Nutrición App - Backend API

API REST para gestión de información nutricional con autenticación JWT.

## 🚀 Instalación

```bash
npm install
```

## ⚙️ Configuración

Crea un archivo `.env` en esta carpeta:

```env
PORT=3030
URI_DB=mongodb+srv://usuario:password@cluster.mongodb.net/nutricion_db?retryWrites=true&w=majority
JWT_SECRET=tu_secreto_generado
```

**Generar JWT_SECRET:**

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 🏃 Ejecutar

```bash
# Desarrollo (con watch mode)
npm run dev

# Producción
npm start
```

El servidor se levantará en `http://localhost:3030`

## 📁 Estructura

```
backend/
├── config/          # Configuración de base de datos
├── controllers/     # Lógica de negocio
├── middlewares/     # Autenticación y validación
├── models/          # Esquemas de MongoDB
├── routes/          # Definición de endpoints
├── services/        # Servicios auxiliares (JWT)
└── index.js         # Punto de entrada
```

## 🌐 Endpoints Principales

### Autenticación

- `POST /api/auth/register` - Registro
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Perfil (requiere token)

### Alimentos (requieren token)

- `GET /api/alimentos` - Listar
- `POST /api/alimentos` - Crear
- `PUT /api/alimentos/:id` - Actualizar
- `DELETE /api/alimentos/:id` - Eliminar

### Categorías (requieren token)

- `GET /api/categorias` - Listar
- `POST /api/categorias` - Crear
- `PUT /api/categorias/:id` - Actualizar
- `DELETE /api/categorias/:id` - Eliminar

## 🛠️ Tecnologías

- Node.js + Express
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcrypt
- CORS
