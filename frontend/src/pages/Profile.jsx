import React from "react";
import {useAuth} from "../context/AuthContext";
import "./Profile.css";

const Profile = () => {
	const {user} = useAuth();

	if (!user) {
		return <div className='loading'>Cargando perfil...</div>;
	}

	return (
		<div className='profile-container'>
			<div className='profile-card'>
				<div className='profile-header'>
					<div className='profile-avatar'>
						{user.name.charAt(0).toUpperCase()}
					</div>
					<h1>Mi Perfil</h1>
				</div>

				<div className='profile-info'>
					<div className='info-row'>
						<span className='info-label'>Nombre:</span>
						<span className='info-value'>{user.name}</span>
					</div>

					<div className='info-row'>
						<span className='info-label'>Email:</span>
						<span className='info-value'>{user.email}</span>
					</div>

					<div className='info-row'>
						<span className='info-label'>Rol:</span>
						<span className='info-value'>{user.role || "user"}</span>
					</div>

					{user.createdAt && (
						<div className='info-row'>
							<span className='info-label'>Miembro desde:</span>
							<span className='info-value'>
								{new Date(user.createdAt).toLocaleDateString("es-ES", {
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
							</span>
						</div>
					)}
				</div>

				<div className='profile-stats'>
					<div className='stat-card'>
						<span className='stat-number'>0</span>
						<span className='stat-label'>Alimentos Creados</span>
					</div>
					<div className='stat-card'>
						<span className='stat-number'>0</span>
						<span className='stat-label'>Categorías Creadas</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
