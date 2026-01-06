import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { register, login } from "../controllers/authController.js";

// Create router instance
const router = express.Router();

// Define routes
router.post("/register", register);
router.post("/login", login);

export default router;