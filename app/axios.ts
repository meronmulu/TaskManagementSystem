import axios from "axios";

const API_BASE_URL = "http://localhost:6600/api";

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("🔐 Sending token:", token); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default instance;
