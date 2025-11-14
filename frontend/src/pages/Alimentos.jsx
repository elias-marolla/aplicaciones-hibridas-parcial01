import React, {useState, useEffect} from "react";
import {alimentosApi} from "../api/alimentosApi";
import "./Alimentos.css";

const Alimentos = () => {
	const [alimentos, setAlimentos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [showForm, setShowForm] = useState(false);
	const [editingId, setEditingId] = useState(null);
	const [formData, setFormData] = useState({
		nombre: "",
		calorias: "",
		proteinas: "",
		carbohidratos: "",
		grasas: "",
		descripcion: "",
	});

	useEffect(() => {
		loadAlimentos();
	}, []);

	const loadAlimentos = async () => {
		try {
			setLoading(true);
			const response = await alimentosApi.getAll();
			setAlimentos(response.data || []);
			setError("");
		} catch (error) {
			setError("Error al cargar alimentos");
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (editingId) {
				await alimentosApi.update(editingId, formData);
			} else {
				await alimentosApi.create(formData);
			}
			loadAlimentos();
			resetForm();
		} catch (error) {
			setError(error.response?.data?.message || "Error al guardar alimento");
		}
	};

	const handleEdit = (alimento) => {
		setFormData(alimento);
		setEditingId(alimento._id);
		setShowForm(true);
	};

	const handleDelete = async (id) => {
		if (window.confirm("¿Estás seguro de eliminar este alimento?")) {
			try {
				await alimentosApi.delete(id);
				loadAlimentos();
			} catch (error) {
				setError("Error al eliminar alimento");
			}
		}
	};

	const resetForm = () => {
		setFormData({
			nombre: "",
			calorias: "",
			proteinas: "",
			carbohidratos: "",
			grasas: "",
			descripcion: "",
		});
		setEditingId(null);
		setShowForm(false);
	};

	if (loading) return <div className='loading'>Cargando...</div>;

	return (
		<div className='alimentos-container'>
			<div className='page-header'>
				<h1>🥗 Gestión de Alimentos</h1>
				<button
					className='btn btn-primary'
					onClick={() => setShowForm(!showForm)}
				>
					{showForm ? "Cancelar" : "Nuevo Alimento"}
				</button>
			</div>

			{error && <div className='error-message'>{error}</div>}

			{showForm && (
				<div className='form-card'>
					<h3>{editingId ? "Editar Alimento" : "Nuevo Alimento"}</h3>
					<form onSubmit={handleSubmit}>
						<div className='form-row'>
							<div className='form-group'>
								<label>Nombre</label>
								<input
									type='text'
									value={formData.nombre}
									onChange={(e) =>
										setFormData({...formData, nombre: e.target.value})
									}
									required
								/>
							</div>
							<div className='form-group'>
								<label>Calorías</label>
								<input
									type='number'
									value={formData.calorias}
									onChange={(e) =>
										setFormData({...formData, calorias: e.target.value})
									}
									required
								/>
							</div>
						</div>

						<div className='form-row'>
							<div className='form-group'>
								<label>Proteínas (g)</label>
								<input
									type='number'
									value={formData.proteinas}
									onChange={(e) =>
										setFormData({...formData, proteinas: e.target.value})
									}
									required
								/>
							</div>
							<div className='form-group'>
								<label>Carbohidratos (g)</label>
								<input
									type='number'
									value={formData.carbohidratos}
									onChange={(e) =>
										setFormData({...formData, carbohidratos: e.target.value})
									}
									required
								/>
							</div>
							<div className='form-group'>
								<label>Grasas (g)</label>
								<input
									type='number'
									value={formData.grasas}
									onChange={(e) =>
										setFormData({...formData, grasas: e.target.value})
									}
									required
								/>
							</div>
						</div>

						<div className='form-group'>
							<label>Descripción</label>
							<textarea
								value={formData.descripcion}
								onChange={(e) =>
									setFormData({...formData, descripcion: e.target.value})
								}
								required
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

			<div className='alimentos-grid'>
				{alimentos.map((alimento) => (
					<div key={alimento._id} className='alimento-card'>
						<h3>{alimento.nombre}</h3>
						<p className='description'>{alimento.descripcion}</p>
						<div className='nutrition-info'>
							<span>{alimento.calorias} kcal</span>
							<span>{alimento.proteinas}g</span>
							<span>{alimento.carbohidratos}g</span>
							<span>{alimento.grasas}g</span>
						</div>
						<div className='card-actions'>
							<button onClick={() => handleEdit(alimento)} className='btn-edit'>
								Editar
							</button>
							<button
								onClick={() => handleDelete(alimento._id)}
								className='btn-delete'
							>
								Eliminar
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Alimentos;
