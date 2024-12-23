import axios from "axios";

const API = axios.create({
  baseURL: "https://rentkar-backend-knt8.onrender.com/api", // Replace with your backend URL
});

// Example functions
export const fetchOrders = () => API.get("/orders");
export const addOrder = (orderData) => API.post("/add/orders", orderData);
export const fetchPartners = () => API.get("/partners");
export const addPartner = (partnerData) => API.post("/add/partners", partnerData);

export default API;
