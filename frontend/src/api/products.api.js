import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

export const getAllProducts = () => axios.get(API_URL, { withCredentials: true });
export const getProductById = (id) => axios.get(`${API_URL}/${id}`, { withCredentials: true });
export const addProduct = (data) => axios.post(API_URL, data, { withCredentials: true });
export const updateProduct = (id, data) => axios.put(`${API_URL}/${id}`, data, { withCredentials: true });
export const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`, { withCredentials: true });
