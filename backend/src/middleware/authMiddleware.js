import { verifyToken } from "../utils/token.js";
import { sendError } from "../utils/response.js";

/**
 * Middleware to protect routes
 * Checks for a valid JWT token in the Authorization header
 */

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return sendError(res, "No token provided", 401);
    }

    // Retrieve the token
    const token = authHeader.split(" ")[1];

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return sendError(res, "Token expired. Please log in again.", 401);
        }

        return sendError(res, "Invalid token", 401);
    }
};