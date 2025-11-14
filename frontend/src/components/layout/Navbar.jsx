import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
	const {isAuthenticated, user, logout} = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	return (
		<nav className='navbar'>
			<div className='nav-container'>
				<Link to='/' className='nav-logo'>
					🥗 Nutrición App
				</Link>

				<ul className='nav-menu'>
					<li className='nav-item'>
						<Link to='/' className='nav-link'>
							Inicio
						</Link>
					</li>

					{isAuthenticated ? (
						<>
							<li className='nav-item'>
								<Link to='/alimentos' className='nav-link'>
									Alimentos
								</Link>
							</li>
							<li className='nav-item'>
								<Link to='/categorias' className='nav-link'>
									Categorías
								</Link>
							</li>
							<li className='nav-item'>
								<Link to='/profile' className='nav-link'>
									Perfil
								</Link>
							</li>
							<li className='nav-item'>
								<span className='nav-user'>👤 {user?.name}</span>
							</li>
							<li className='nav-item'>
								<button onClick={handleLogout} className='nav-button'>
									Cerrar Sesión
								</button>
							</li>
						</>
					) : (
						<>
							<li className='nav-item'>
								<Link to='/login' className='nav-link'>
									Iniciar Sesión
								</Link>
							</li>
							<li className='nav-item'>
								<Link to='/register' className='nav-button'>
									Registrarse
								</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
