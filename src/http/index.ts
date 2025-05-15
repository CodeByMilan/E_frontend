import axios from "axios";

// Base API without authentication
const API = axios.create({
  baseURL: "https://e-backend-pzfw.onrender.com",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Authenticated API with dynamic token handling
const APIAuthenticated = axios.create({
  baseURL: "https://e-backend-pzfw.onrender.com",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor to dynamically add token
APIAuthenticated.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Global response error handler
APIAuthenticated.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
      // Handle token expiration or logout
      localStorage.removeItem("token");
      window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);

export { API, APIAuthenticated };
