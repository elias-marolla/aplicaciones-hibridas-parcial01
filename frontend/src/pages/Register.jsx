import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import "./Auth.css";

const Register = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [error, setError] = useState("");
	const [fieldErrors, setFieldErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const {register} = useAuth();
	const navigate = useNavigate();

	const handleChange = (e) => {
		const {name, value} = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
		setError("");
		if (fieldErrors[name]) {
			setFieldErrors({
				...fieldErrors,
				[name]: "",
			});
		}
	};

	const validateForm = () => {
		const errors = {};

		// Validar nombre
		if (!formData.name.trim()) {
			errors.name = "El nombre es requerido";
		} else if (formData.name.trim().length < 2) {
			errors.name = "El nombre debe tener al menos 2 caracteres";
		}

		// Validar email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!formData.email.trim()) {
			errors.email = "El email es requerido";
		} else if (!emailRegex.test(formData.email)) {
			errors.email = "Email inválido";
		}

		// Validar contraseña
		if (!formData.password) {
			errors.password = "La contraseña es requerida";
		} else if (formData.password.length < 6) {
			errors.password = "La contraseña debe tener al menos 6 caracteres";
		}

		// Validar confirmación de contraseña
		if (!formData.confirmPassword) {
			errors.confirmPassword = "Debes confirmar tu contraseña";
		} else if (formData.password !== formData.confirmPassword) {
			errors.confirmPassword = "Las contraseñas no coinciden";
		}

		setFieldErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) {
			setError("Por favor, corrige los errores en el formulario");
			return;
		}

		setLoading(true);
		setError("");

		const {confirmPassword, ...dataToSend} = formData;
		const result = await register(dataToSend);

		if (result.success) {
			navigate("/alimentos");
		} else {
			setError(result.error);
		}

		setLoading(false);
	};

	return (
		<div className='auth-container'>
			<div className='auth-card'>
				<h2>Crear Cuenta</h2>
				<p className='auth-subtitle'>Únete a Nutrición App</p>

				{error && <div className='error-message'>{error}</div>}

				<form onSubmit={handleSubmit}>
					<div className='form-group'>
						<label htmlFor='name'>Nombre Completo</label>
						<input
							type='text'
							id='name'
							name='name'
							value={formData.name}
							onChange={handleChange}
							placeholder='Tu nombre'
							className={fieldErrors.name ? "input-error" : ""}
						/>
						{fieldErrors.name && (
							<span className='field-error'>{fieldErrors.name}</span>
						)}
					</div>

					<div className='form-group'>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							id='email'
							name='email'
							value={formData.email}
							onChange={handleChange}
							placeholder='tu@email.com'
							className={fieldErrors.email ? "input-error" : ""}
						/>
						{fieldErrors.email && (
							<span className='field-error'>{fieldErrors.email}</span>
						)}
					</div>

					<div className='form-group'>
						<label htmlFor='password'>Contraseña</label>
						<input
							type='password'
							id='password'
							name='password'
							value={formData.password}
							onChange={handleChange}
							placeholder='Mínimo 6 caracteres'
							className={fieldErrors.password ? "input-error" : ""}
						/>
						{fieldErrors.password && (
							<span className='field-error'>{fieldErrors.password}</span>
						)}
					</div>

					<div className='form-group'>
						<label htmlFor='confirmPassword'>Confirmar Contraseña</label>
						<input
							type='password'
							id='confirmPassword'
							name='confirmPassword'
							value={formData.confirmPassword}
							onChange={handleChange}
							placeholder='Repite tu contraseña'
							className={fieldErrors.confirmPassword ? "input-error" : ""}
						/>
						{fieldErrors.confirmPassword && (
							<span className='field-error'>{fieldErrors.confirmPassword}</span>
						)}
					</div>

					<button type='submit' className='btn btn-primary' disabled={loading}>
						{loading ? "Creando cuenta..." : "Registrarse"}
					</button>
				</form>

				<p className='auth-footer'>
					¿Ya tienes cuenta? <Link to='/login'>Inicia sesión aquí</Link>
				</p>
			</div>
		</div>
	);
};

export default Register;
