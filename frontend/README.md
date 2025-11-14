# 🎨 Nutrición App - Frontend

Frontend de la aplicación de gestión nutricional desarrollado con React.js.

## 🚀 Instalación

```bash
npm install
```

## ⚙️ Configuración

Crea un archivo `.env` en esta carpeta:

```env
REACT_APP_API_URL=http://localhost:3030/api
```

## 🏃 Ejecutar

```bash
npm start
```

La aplicación se abrirá en `http://localhost:3000`

## 📦 Build para Producción

```bash
npm run build
```

## 📁 Estructura

```
src/
├── api/              # Lógica de comunicación con la API
├── components/       # Componentes reutilizables
├── context/          # Context API para estado global
├── pages/            # Páginas principales
├── App.jsx           # Componente principal + Routing
└── index.js          # Punto de entrada
```

## 🛠️ Tecnologías

- React 18
- React Router v6
- Axios
- Context API
