import bcrypt from "bcryptjs";
import { getUserByEmail, getUserById, createUser } from "../models/userModel.js";
import { sendSuccess, sendError } from "../utils/response.js";
import { generateToken } from "../utils/token.js";

// User registration
export const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return sendError(res, "A user already exists with that email", 400);
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new user
        const insertId = await createUser(email, hashedPassword);

        return sendSuccess(res, "User registered successfully", { insertId },  201);
    } catch (error) {
        console.error(error);
        return sendError(res, "Server error");
    }
};

// User log in
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await getUserByEmail(email);

        if (!user) {
            return sendError(res, "Invalid email or password", 401);
        }

        // Check if passwords match
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return sendError(res, "Invalid email or password", 401);
        }

        // Generate JWT
        const token = generateToken({ id: user.id });

        // Set cookie
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // true in prod
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
            path: "/"
        });

        return sendSuccess(res, "Login successful", { id: user.id, email: user.email });
    } catch (error) {
        console.error(error);
        return sendError(res, "Server error");
    }
};

// User log out
export const logout = (req, res) => {
    res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
    });

    return sendSuccess(res, "Logged out successfully");
};

// Return authenticated user
export const getCurrentUser = async (req, res) => {
    // req.user comes from authMiddleware (decoded JWT)
    const user = await getUserById(req.user.id);
    if (!user) return sendError(res, "User not found", 404)

    return sendSuccess(res, "User retrieved successfully", { user });
};
