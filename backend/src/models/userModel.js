import pool from "../db/pool.js"

// Get a user by email
export const getUserByEmail = async (email) => {
    const [rows] = await pool.query("SELECT id, email, password FROM users WHERE email = ?", [email]);
    return rows[0] || null;
};

// Create a new user
export const createUser = async (email, hashedPassword) => {
    const [result] = await pool.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword]);
    return result.insertId;
};