import axios from "axios";

// Create axios client
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
    withCredentials: true, // Required for cookie auth
    headers: {
        "Content-Type": "application/json"
    }
});

// Add response interceptor
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const err = {
            status: error.response?.status,
            message: error.response?.data?.message || error.response?.data?.error || error.message,
            data: error.response?.data
        };

        return Promise.reject(err);
    }
);

export default api;