import React from "react";
import {Link} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import "./Home.css";

const Home = () => {
	const {isAuthenticated} = useAuth();

	return (
		<div className='home-container'>
			<div className='hero-section'>
				<h1>🥗 Bienvenido a Nutrición App</h1>
				<p className='hero-subtitle'>
					Gestiona tus alimentos y obtén información nutricional detallada
				</p>

				{!isAuthenticated ? (
					<div className='hero-buttons'>
						<Link to='/register' className='btn btn-secondary'>
							Comenzar Ahora
						</Link>
						<Link to='/login' className='btn btn-secondary'>
							Iniciar Sesión
						</Link>
					</div>
				) : (
					<div className='hero-buttons'>
						<Link to='/alimentos' className='btn btn-secondary'>
							Ver Alimentos
						</Link>
						<Link to='/categorias' className='btn btn-secondary'>
							Ver Categorías
						</Link>
					</div>
				)}
			</div>

			<div className='features-section'>
				<h2>Características</h2>
				<div className='features-grid'>
					<div className='feature-card'>
						<span className='feature-icon'>📊</span>
						<h3>Información Nutricional</h3>
						<p>
							Accede a datos detallados de calorías, proteínas, carbohidratos y
							grasas
						</p>
					</div>
					<div className='feature-card'>
						<span className='feature-icon'>🔍</span>
						<h3>Búsqueda Avanzada</h3>
						<p>
							Encuentra alimentos por nombre o filtra por valores nutricionales
						</p>
					</div>
					<div className='feature-card'>
						<span className='feature-icon'>📂</span>
						<h3>Categorías</h3>
						<p>Organiza tus alimentos en categorías personalizadas</p>
					</div>
					<div className='feature-card'>
						<span className='feature-icon'>🔐</span>
						<h3>Seguridad</h3>
						<p>Tus datos protegidos con autenticación JWT</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
