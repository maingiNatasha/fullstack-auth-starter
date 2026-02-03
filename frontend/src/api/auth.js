import api from "./client.js";

export const authApi = {
    register: (email, password) => api.post("/auth/register", { email, password }),
    login: (email, password, remember) => api.post("/auth/login", { email, password, remember }),
    logout: () => api.post("/auth/logout"),
    me: () => api.get("/auth/user"),
};