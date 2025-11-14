import React, {createContext, useState, useContext, useEffect} from "react";
import {authApi} from "../api/authApi";

const AuthContext = createContext();

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth debe ser usado dentro de AuthProvider");
	}
	return context;
};

export const AuthProvider = ({children}) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	// Verificar si hay un usuario logueado al cargar la app
	useEffect(() => {
		checkAuth();
	}, []);

	const checkAuth = async () => {
		try {
			const token = localStorage.getItem("token");
			if (token) {
				const response = await authApi.verifyToken();
				setUser(response.data.user);
				setIsAuthenticated(true);
			}
		} catch (error) {
			console.error("Error al verificar autenticación:", error);
			logout();
		} finally {
			setLoading(false);
		}
	};

	const login = async (credentials) => {
		try {
			const response = await authApi.login(credentials);
			const {user, token} = response.data;

			localStorage.setItem("token", token);
			localStorage.setItem("user", JSON.stringify(user));

			setUser(user);
			setIsAuthenticated(true);

			return {success: true, data: response.data};
		} catch (error) {
			const message =
				error.response?.data?.message || "Error al iniciar sesión";
			return {success: false, error: message};
		}
	};

	const register = async (userData) => {
		try {
			const response = await authApi.register(userData);
			const {user, token} = response.data;

			localStorage.setItem("token", token);
			localStorage.setItem("user", JSON.stringify(user));

			setUser(user);
			setIsAuthenticated(true);

			return {success: true, data: response.data};
		} catch (error) {
			const message = error.response?.data?.message || "Error al registrarse";
			return {success: false, error: message};
		}
	};

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		setUser(null);
		setIsAuthenticated(false);
	};

	const value = {
		user,
		isAuthenticated,
		loading,
		login,
		register,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
