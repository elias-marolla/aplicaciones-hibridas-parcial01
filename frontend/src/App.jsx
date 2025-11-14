import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import {AuthProvider, useAuth} from "./context/AuthContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Alimentos from "./pages/Alimentos";
import Categorias from "./pages/Categorias";
import Profile from "./pages/Profile";
import LoadingSpinner from "./components/common/LoadingSpinner";
import "./App.css";

// Componente para proteger rutas
const ProtectedRoute = ({children}) => {
	const {isAuthenticated, loading} = useAuth();

	if (loading) {
		return <LoadingSpinner />;
	}

	return isAuthenticated ? children : <Navigate to='/login' />;
};

// Componente principal con las rutas
const AppRoutes = () => {
	const {loading} = useAuth();

	if (loading) {
		return <LoadingSpinner />;
	}

	return (
		<div className='app-container'>
			<Navbar />
			<main className='main-content'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />

					{/* Rutas protegidas */}
					<Route
						path='/alimentos'
						element={
							<ProtectedRoute>
								<Alimentos />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/categorias'
						element={
							<ProtectedRoute>
								<Categorias />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/profile'
						element={
							<ProtectedRoute>
								<Profile />
							</ProtectedRoute>
						}
					/>

					{/* Ruta 404 */}
					<Route path='*' element={<Navigate to='/' />} />
				</Routes>
			</main>
			<Footer />
		</div>
	);
};

function App() {
	return (
		<Router>
			<AuthProvider>
				<AppRoutes />
			</AuthProvider>
		</Router>
	);
}

export default App;
