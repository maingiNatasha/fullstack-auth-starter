import express from "express";
import { register, login, getCurrentUser } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validationMiddleware.js";
import { registerValidator, loginValidator } from "../validators/authValidator.js";

// Create router instance
const router = express.Router();

// Define routes
router.post("/register", registerValidator, validate, register);
router.post("/login", loginValidator, validate, login);
router.get("/user", authMiddleware, getCurrentUser);

export default router;