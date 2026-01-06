import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { getUserByEmail, createUser } from "../models/userModel.js";
import { sendSuccess, sendError } from "../utils/response.js";
import { generateToken } from "../utils/token.js";

// Read .env file
dotenv.config();

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
        await createUser(email, hashedPassword);

        return sendSuccess(res, "User registered successfully", 201);
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
        const user = getUserByEmail(email);

        if (!user) {
            return sendError(res, "Invalid email. No user exists with that email.", 401);
        }

        // Check if passwords match
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return sendError(res, "Invalid password. Please try again.", 401);
        }

        // Generate JWT
        const token = generateToken({ id: user.id, email: user.email });

        return sendSuccess(res, "Login successful", { token, email: user.email });
    } catch (error) {
        console.error(error);
        return sendError(res, "Server error");
    }
};