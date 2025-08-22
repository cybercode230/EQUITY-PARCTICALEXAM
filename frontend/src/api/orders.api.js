import axios from "axios";

const API_URL = "http://localhost:5000/api/orders";

export const placeOrder = (items) => axios.post(API_URL, { items }, { withCredentials: true });
export const getMyOrders = () => axios.get(`${API_URL}/my-orders`, { withCredentials: true });
export const getAllOrders = () => axios.get(API_URL, { withCredentials: true });
export const updateOrderStatus = (id, status) => axios.put(`${API_URL}/${id}/status`, { status }, { withCredentials: true });
