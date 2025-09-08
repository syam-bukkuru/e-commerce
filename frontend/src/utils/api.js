import axios from "axios";

// Use environment variable from Vite
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/api",
});

// Attach JWT token if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
    console.log("Token attached:", token);
  }
  return req;
});

export default API;
