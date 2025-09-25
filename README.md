# Aplicaciones Híbridas - Parcial 01

API RESTful de Nutrición desarrollada con Node.js, Express y MongoDB

## 📋 Descripción del Proyecto

Esta API REST permite gestionar información nutricional de alimentos, categorías y usuarios. Está diseñada para proporcionar datos estructurados sobre valores nutricionales (calorías, proteínas, carbohidratos, grasas) que pueden ser utilizados por desarrolladores, nutricionistas o aplicaciones de salud.

### ✨ Características principales

- 🔐 **Sistema de usuarios** con contraseñas hasheadas (bcrypt)
- 🥗 **Gestión de alimentos** con información nutricional completa
- 📂 **Sistema de categorías** para organizar alimentos
- 🔍 **Búsqueda y filtrado** avanzado de alimentos
- 📊 **Operaciones CRUD** completas para todos los recursos
- 🛡️ **Validaciones** de datos y manejo de errores
- 📚 **Documentación visual** integrada

## 👥 Integrantes del Equipo

- **Asensio Diego**
- **Diaz Sol**
- **Marolla Elias**

## 👨‍🏫 Información Académica

- **Docente:** Cruz Jonathan Emanuel
- **Materia:** Aplicaciones Híbridas
- **Comisión:** DDWN4AV

## 🚀 Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **bcrypt** - Hasheo de contraseñas
- **dotenv** - Variables de entorno
- **jsonwebtoken** - Tokens JWT (preparado para autenticación)

## 📦 Instalación y Configuración

### Prerrequisitos

- Node.js (versión 14 o superior)
- MongoDB (local o Atlas)
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/elias-marolla/aplicaciones-hibridas-parcial01.git
cd aplicaciones-hibridas-parcial01
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**
   Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=3030
URI_DB=mongodb://localhost:27017/nutricion_db
# o para MongoDB Atlas:
# URI_DB=mongodb+srv://usuario:password@cluster.mongodb.net/nutricion_db
```

4. **Iniciar el servidor**

```bash
npm start
```

El servidor se levantará en `http://localhost:3030`

## 📚 Documentación de la API

### Base URL

```
http://localhost:3030/api
```

### 🔐 Endpoints de Usuarios

| Método | Endpoint     | Descripción                | Body                                                          |
| ------ | ------------ | -------------------------- | ------------------------------------------------------------- |
| GET    | `/users`     | Obtener todos los usuarios | -                                                             |
| GET    | `/users/:id` | Obtener usuario por ID     | -                                                             |
| POST   | `/users`     | Crear nuevo usuario        | `{"name": "string", "email": "string", "password": "string"}` |
| PUT    | `/users/:id` | Actualizar usuario         | `{"name": "string", "email": "string", "password": "string"}` |
| DELETE | `/users/:id` | Eliminar usuario           | -                                                             |

**⚠️ Importante sobre contraseñas:**

- Las contraseñas se almacenan hasheadas con bcrypt
- Longitud mínima: 6 caracteres
- Las contraseñas nunca se devuelven en las respuestas de la API

### 🥗 Endpoints de Alimentos

| Método | Endpoint            | Descripción                       | Parámetros        |
| ------ | ------------------- | --------------------------------- | ----------------- |
| GET    | `/alimentos`        | Obtener todos los alimentos       | -                 |
| GET    | `/alimentos/:id`    | Obtener alimento por ID           | -                 |
| POST   | `/alimentos`        | Crear nuevo alimento              | Ver body abajo    |
| PUT    | `/alimentos/:id`    | Actualizar alimento               | Ver body abajo    |
| DELETE | `/alimentos/:id`    | Eliminar alimento                 | -                 |
| GET    | `/alimentos/search` | Buscar por nombre                 | `?nombre=texto`   |
| GET    | `/alimentos/filter` | Filtrar por valores nutricionales | Ver filtros abajo |

**Body para crear/actualizar alimentos:**

```json
{
	"nombre": "Pollo a la plancha",
	"calorias": 165,
	"proteinas": 31,
	"carbohidratos": 0,
	"grasas": 3.6,
	"descripcion": "Pechuga de pollo sin piel cocinada a la plancha"
}
```

**Filtros disponibles:**

- `minCalorias` / `maxCalorias`
- `minProteinas` / `maxProteinas`
- `minCarbohidratos` / `maxCarbohidratos`
- `minGrasas` / `maxGrasas`

**Ejemplo de filtrado:**

```
GET /api/alimentos/filter?minProteinas=20&maxCalorias=300
```

### 📂 Endpoints de Categorías

| Método | Endpoint          | Descripción                  | Body                                            |
| ------ | ----------------- | ---------------------------- | ----------------------------------------------- |
| GET    | `/categorias`     | Obtener todas las categorías | -                                               |
| GET    | `/categorias/:id` | Obtener categoría por ID     | -                                               |
| POST   | `/categorias`     | Crear nueva categoría        | `{"nombre": "string", "descripcion": "string"}` |
| PUT    | `/categorias/:id` | Actualizar categoría         | `{"nombre": "string", "descripcion": "string"}` |
| DELETE | `/categorias/:id` | Eliminar categoría           | -                                               |

## 🗃️ Estructura de la Base de Datos

### Colección Users

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Colección Alimentos

```javascript
{
  _id: ObjectId,
  nombre: String (unique),
  calorias: Number,
  proteinas: Number,
  carbohidratos: Number,
  grasas: Number,
  descripcion: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Colección Categorias

```javascript
{
  _id: ObjectId,
  nombre: String (unique),
  descripcion: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 📖 Ejemplos de Uso

### Crear un usuario

```bash
curl -X POST http://localhost:3030/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "María García",
    "email": "maria@example.com",
    "password": "miPassword123"
  }'
```

### Buscar alimentos por nombre

```bash
curl "http://localhost:3030/api/alimentos/search?nombre=pollo"
```

### Filtrar alimentos altos en proteína

```bash
curl "http://localhost:3030/api/alimentos/filter?minProteinas=25"
```

## 🔧 Scripts Disponibles

- `npm start` - Inicia el servidor con watch mode
- `npm test` - Ejecuta las pruebas (por implementar)

## 🌐 Documentación Visual

La API incluye una documentación visual accesible en:

```
http://localhost:3030
```

## 🔒 Seguridad Implementada

- ✅ Contraseñas hasheadas con bcrypt (10 salt rounds)
- ✅ Validación de datos de entrada
- ✅ Protección contra duplicados (email y nombres únicos)
- ✅ Exclusión de contraseñas en respuestas
- ✅ Manejo seguro de errores

## 🚧 Próximas Mejoras

- [ ] Sistema de autenticación JWT
- [ ] Middleware de autorización
- [ ] Relación entre alimentos y categorías
- [ ] Paginación en listados
- [ ] Validaciones más robustas
- [ ] Tests unitarios e integración
- [ ] Rate limiting
- [ ] Logging avanzado

## 📄 Licencia

ISC

## 🔗 Enlaces

- **Repositorio:** [https://github.com/elias-marolla/aplicaciones-hibridas-parcial01](https://github.com/elias-marolla/aplicaciones-hibridas-parcial01)
- **Issues:** [https://github.com/elias-marolla/aplicaciones-hibridas-parcial01/issues](https://github.com/elias-marolla/aplicaciones-hibridas-parcial01/issues)

**Desarrollado con ❤️ por el equipo de Aplicaciones Híbridas**
