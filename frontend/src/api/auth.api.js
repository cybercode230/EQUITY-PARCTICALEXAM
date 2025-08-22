import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const register = (data) => axios.post(`${API_URL}/register`, data);
export const login = (data) => axios.post(`${API_URL}/login`, data, { withCredentials: true });
export const logout = () => axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
