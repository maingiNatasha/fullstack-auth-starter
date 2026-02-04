import axios from "axios";
import { triggerUnauthorized } from "../auth/authEvents.js";

// Create axios client
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
    withCredentials: true, // Required for cookie auth
    headers: {
        "Content-Type": "application/json"
    }
});

let handled = false;

// Add response interceptor
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const status = error.response?.status;
        const serverMessage = error.response?.data?.message || error.response?.data?.error;

        if (status === 401 && !handled) {
            handled = true;
            const message = serverMessage === "Token expired. Please log in again." ? "Session expired. Please log in again." : "You've been logged out. Please log in again.";
            triggerUnauthorized({ message });
        }

        const err = {
            status: error.response?.status,
            message: error.response?.data?.message || error.response?.data?.error || error.message,
            data: error.response?.data
        };

        return Promise.reject(err);
    }
);

export default api;