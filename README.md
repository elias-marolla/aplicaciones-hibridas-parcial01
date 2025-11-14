# 🥗 Nutrición App - Aplicaciones Híbridas Parcial 02

Aplicación fullstack MERN (MongoDB, Express, React, Node.js) para gestión de información nutricional de alimentos.

## 👥 Equipo de Desarrollo

- **Asensio Diego**
- **Diaz Diaz Sol**
- **Marolla Elias**

### 👨‍🏫 Información Académica

- **Docente:** Cruz Jonathan Emanuel
- **Materia:** Aplicaciones Híbridas 2
- **Comisión:** DDWN4AV
- **Parcial:** 02 - Proyecto FullStack

---

## 📋 Descripción del Proyecto

Sistema completo de gestión nutricional que permite a los usuarios:

- 🔐 Registrarse y autenticarse de forma segura con JWT
- 🥗 Crear, editar y eliminar alimentos con información nutricional detallada
- 📂 Organizar alimentos en categorías personalizadas
- 🔍 Buscar y filtrar alimentos por valores nutricionales
- 👤 Gestionar su perfil de usuario

---

## 🚀 Tecnologías Utilizadas

### Backend

- **Node.js** v18+ - Entorno de ejecución
- **Express.js** - Framework web para API REST
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación mediante tokens
- **bcrypt** - Encriptación de contraseñas
- **CORS** - Habilitar comunicación frontend-backend

### Frontend

- **React.js** v18+ - Biblioteca de UI
- **React Router** - Enrutamiento de páginas
- **Context API** - Manejo de estado global
- **Axios** - Cliente HTTP para consumir API
- **CSS3** - Estilos personalizados

---

## 📦 Instalación y Configuración

### Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- Node.js (v18 o superior)
- MongoDB Atlas account (o MongoDB local)
- npm o yarn
- Git

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/elias-marolla/aplicaciones-hibridas-parcial01.git
cd aplicaciones-hibridas-parcial01
```

### 2️⃣ Configurar el Backend

```bash
# Ir a la carpeta del backend
cd backend

# Instalar dependencias
npm install

# Crear archivo .env (ver sección de variables de entorno)
# Archivo .env ya está incluido en la entrega
```

**Crear archivo `backend/.env`:**

```env
PORT=3030
URI_DB=mongodb+srv://usuario:password@cluster.mongodb.net/nutricion_db?retryWrites=true&w=majority
JWT_SECRET=tu_secreto_generado_con_node
```

**⚠️ Importante:**

- Reemplaza `usuario:password` con tus credenciales de MongoDB Atlas
- Genera un JWT_SECRET seguro con: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`

**Iniciar el backend:**

```bash
npm start
```

El servidor estará disponible en: `http://localhost:3030`

### 3️⃣ Configurar el Frontend

En una **nueva terminal**:

```bash
# Ir a la carpeta del frontend
cd frontend

# Instalar dependencias
npm install

# Crear archivo .env
```

**Crear archivo `frontend/.env`:**

```env
REACT_APP_API_URL=http://localhost:3030/api
```

**Iniciar el frontend:**

```bash
npm start
```

El frontend estará disponible en: `http://localhost:3000`

---

## 📁 Estructura del Proyecto

```
aplicaciones-hibridas-parcial01/
│
├── backend/                      # API REST
│   ├── config/
│   │   └── db.js                # Configuración de MongoDB
│   ├── controllers/             # Lógica de negocio
│   │   ├── authController.js    # Login, Register
│   │   ├── userController.js    # CRUD Usuarios
│   │   ├── alimentoController.js
│   │   └── categoriaController.js
│   ├── middlewares/             # Middlewares personalizados
│   │   ├── authMiddleware.js    # Verificar JWT
│   │   └── validationMiddleware.js
│   ├── models/                  # Esquemas de MongoDB
│   │   ├── userModel.js
│   │   ├── alimentoModel.js
│   │   └── categoriaModel.js
│   ├── routes/                  # Definición de rutas
│   │   ├── authRouter.js
│   │   ├── userRouter.js
│   │   ├── alimentoRouter.js
│   │   ├── categoriaRouter.js
│   │   └── index.js
│   ├── services/                # Servicios auxiliares
│   │   └── jwtService.js        # Generación/verificación JWT
│   ├── .env                     # Variables de entorno
│   ├── index.js                 # Punto de entrada
│   └── package.json
│
├── frontend/                     # Aplicación React
│   ├── public/
│   ├── src/
│   │   ├── api/                 # Lógica de comunicación con API
│   │   │   ├── axiosConfig.js
│   │   │   ├── authApi.js
│   │   │   ├── alimentosApi.js
│   │   │   └── categoriasApi.js
│   │   ├── components/          # Componentes React
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   └── common/
│   │   │       └── LoadingSpinner.jsx
│   │   ├── context/             # Context API
│   │   │   └── AuthContext.jsx
│   │   ├── pages/               # Páginas principales
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Alimentos.jsx
│   │   │   ├── Categorias.jsx
│   │   │   └── Profile.jsx
│   │   ├── App.jsx              # Componente principal + Rutas
│   │   ├── index.js
│   │   └── App.css
│   ├── .env
│   └── package.json
│
└── README.md                     # Este archivo
```

---

## 🔐 Funcionalidades Implementadas

### Autenticación (JWT)

- ✅ Registro de usuarios con contraseñas encriptadas (bcrypt)
- ✅ Login con generación de token JWT
- ✅ Rutas protegidas que requieren autenticación
- ✅ Verificación automática de token al iniciar la app
- ✅ Logout con limpieza de sesión

### Gestión de Alimentos

- ✅ Crear alimentos con datos nutricionales (calorías, proteínas, carbohidratos, grasas)
- ✅ Listar todos los alimentos
- ✅ Editar información de alimentos existentes
- ✅ Eliminar alimentos
- ✅ Buscar alimentos por nombre
- ✅ Filtrar alimentos por valores nutricionales

### Gestión de Categorías

- ✅ Crear categorías para organizar alimentos
- ✅ Listar todas las categorías
- ✅ Editar categorías
- ✅ Eliminar categorías

### Validaciones

- ✅ Validación de datos en el backend (middlewares)
- ✅ Validación de formularios en el frontend
- ✅ Mensajes de error descriptivos
- ✅ Manejo de errores de red y autenticación

---

## 🌐 Endpoints de la API

### Autenticación (Públicos)

```
POST   /api/auth/register    - Registrar nuevo usuario
POST   /api/auth/login       - Iniciar sesión
GET    /api/auth/profile     - Obtener perfil (requiere token)
GET    /api/auth/verify      - Verificar token válido
```

### Alimentos (Protegidos - Requieren JWT)

```
GET    /api/alimentos                    - Listar todos
GET    /api/alimentos/:id                - Obtener por ID
POST   /api/alimentos                    - Crear alimento
PUT    /api/alimentos/:id                - Actualizar alimento
DELETE /api/alimentos/:id                - Eliminar alimento
GET    /api/alimentos/search?nombre=X    - Buscar por nombre
GET    /api/alimentos/filter?minProteinas=20  - Filtrar
```

### Categorías (Protegidas - Requieren JWT)

```
GET    /api/categorias        - Listar todas
GET    /api/categorias/:id    - Obtener por ID
POST   /api/categorias        - Crear categoría
PUT    /api/categorias/:id    - Actualizar categoría
DELETE /api/categorias/:id    - Eliminar categoría
```

### Usuarios (Protegidos - Requieren JWT)

```
GET    /api/users             - Listar todos los usuarios
GET    /api/users/:id         - Obtener usuario por ID
PUT    /api/users/:id         - Actualizar usuario
DELETE /api/users/:id         - Eliminar usuario
```

---

## 🧪 Cómo Probar la Aplicación

### Flujo Completo de Usuario

1. **Registro**

   - Accede a `http://localhost:3000/register`
   - Completa el formulario con nombre, email y contraseña
   - Al registrarte, se te redirigirá automáticamente a la página de alimentos

2. **Crear Alimentos**

   - Click en "Nuevo Alimento"
   - Completa la información nutricional
   - Guarda el alimento

3. **Crear Categorías**

   - Ve a la sección "Categorías"
   - Crea categorías como "Proteínas", "Carbohidratos", etc.

4. **Buscar y Filtrar**

   - Usa la búsqueda para encontrar alimentos específicos
   - Filtra por valores nutricionales (ej: alimentos con >20g de proteínas)

5. **Ver Perfil**
   - Accede a tu perfil para ver tu información

---

## 🛡️ Seguridad Implementada

- ✅ Contraseñas hasheadas con bcrypt (10 salt rounds)
- ✅ Tokens JWT con expiración de 7 días
- ✅ Validación de datos en backend y frontend
- ✅ Protección contra inyecciones SQL (uso de Mongoose)
- ✅ CORS configurado para permitir solo origen del frontend
- ✅ Variables de entorno para secretos (no se suben a Git)
- ✅ Interceptores de Axios para manejo automático de tokens expirados

---

## 🔗 Enlaces

- **Repositorio:** [GitHub](https://github.com/elias-marolla/aplicaciones-hibridas-parcial01)

---

**Desarrollado por el equipo de Aplicaciones Híbridas 2**

_Asensio Diego • Diaz Diaz Sol • Marolla Elias_
