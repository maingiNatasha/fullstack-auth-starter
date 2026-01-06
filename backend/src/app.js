import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

// Create express app
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);

export default app;