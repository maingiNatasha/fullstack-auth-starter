import { useEffect, useState } from "react";
import { authApi } from "../api/auth.js";
import AuthContext from "./AuthContext.jsx";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch current user based on cookie
    const refreshUser = async () => {
        try {
            const res = await authApi.me();
            const currentUser = res?.data?.user ?? null;
            setUser(currentUser);
            return currentUser;
        } catch (err) {
            console.error(err);
            setUser(null);
            return null;
        }
    };

    const login = async (email, password) => {
        await authApi.login(email, password); // sets HttpOnly cookie
        return refreshUser(); // populate user state
    }

    const register = async (email, password) => {
        await authApi.register(email, password);
        return refreshUser();
    }

    const logout = async () => {
        try {
            await authApi.logout(); // clears cookie
        } finally {
            setUser(null);
        }
    }

    // Bootstrap: on initial app load, check if cookie exists by calling /auth/user
    // Bootstrapping = the process of restoring auth state when the app first loads.
    useEffect(() => {
        (async () => {
            setLoading(true);
            await refreshUser();
            setLoading(false);
        })();
    }, []);

    const value = {
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
        refreshUser,
        setUser,
    };

    return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>);
}
