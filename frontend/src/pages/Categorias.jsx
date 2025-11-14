import React, {useState, useEffect} from "react";
import {categoriasApi} from "../api/categoriasApi";
import "./Categorias.css";

const Categorias = () => {
	const [categorias, setCategorias] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [showForm, setShowForm] = useState(false);
	const [editingId, setEditingId] = useState(null);
	const [formData, setFormData] = useState({
		nombre: "",
		descripcion: "",
	});

	useEffect(() => {
		loadCategorias();
	}, []);

	const loadCategorias = async () => {
		try {
			setLoading(true);
			const response = await categoriasApi.getAll();
			setCategorias(response || []);
			setError("");
		} catch (error) {
			setError("Error al cargar categorías");
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (editingId) {
				await categoriasApi.update(editingId, formData);
			} else {
				await categoriasApi.create(formData);
			}
			loadCategorias();
			resetForm();
		} catch (error) {
			setError(error.response?.data?.message || "Error al guardar categoría");
		}
	};

	const handleEdit = (categoria) => {
		setFormData({
			nombre: categoria.nombre,
			descripcion: categoria.descripcion,
		});
		setEditingId(categoria._id);
		setShowForm(true);
	};

	const handleDelete = async (id) => {
		if (window.confirm("¿Estás seguro de eliminar esta categoría?")) {
			try {
				await categoriasApi.delete(id);
				loadCategorias();
			} catch (error) {
				setError("Error al eliminar categoría");
			}
		}
	};

	const resetForm = () => {
		setFormData({
			nombre: "",
			descripcion: "",
		});
		setEditingId(null);
		setShowForm(false);
	};

	if (loading) return <div className='loading'>Cargando...</div>;

	return (
		<div className='categorias-container'>
			<div className='page-header'>
				<h1>📂 Gestión de Categorías</h1>
				<button
					className='btn btn-primary'
					onClick={() => setShowForm(!showForm)}
				>
					{showForm ? "Cancelar" : "Nueva Categoría"}
				</button>
			</div>

			{error && <div className='error-message'>{error}</div>}

			{showForm && (
				<div className='form-card'>
					<h3>{editingId ? "Editar Categoría" : "Nueva Categoría"}</h3>
					<form onSubmit={handleSubmit}>
						<div className='form-group'>
							<label>Nombre</label>
							<input
								type='text'
								value={formData.nombre}
								onChange={(e) =>
									setFormData({...formData, nombre: e.target.value})
								}
								required
								placeholder='Ej: Proteínas, Carbohidratos...'
							/>
						</div>

						<div className='form-group'>
							<label>Descripción</label>
							<textarea
								value={formData.descripcion}
								onChange={(e) =>
									setFormData({...formData, descripcion: e.target.value})
								}
								required
								placeholder='Describe esta categoría...'
								rows='4'
							/>
						</div>

						<div className='form-buttons'>
							<button type='submit' className='btn btn-primary'>
								{editingId ? "Actualizar" : "Crear"}
							</button>
							<button
								type='button'
								className='btn btn-secondary'
								onClick={resetForm}
							>
								Cancelar
							</button>
						</div>
					</form>
				</div>
			)}

			<div className='categorias-grid'>
				{categorias.length === 0 ? (
					<div className='empty-state'>
						<p>No hay categorías creadas</p>
						<button
							className='btn btn-primary'
							onClick={() => setShowForm(true)}
						>
							Crear Primera Categoría
						</button>
					</div>
				) : (
					categorias.map((categoria) => (
						<div key={categoria._id} className='categoria-card'>
							<div className='categoria-icon'>📂</div>
							<h3>{categoria.nombre}</h3>
							<p>{categoria.descripcion}</p>
							<div className='card-actions'>
								<button
									onClick={() => handleEdit(categoria)}
									className='btn-edit'
								>
									Editar
								</button>
								<button
									onClick={() => handleDelete(categoria._id)}
									className='btn-delete'
								>
									Eliminar
								</button>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default Categorias;
