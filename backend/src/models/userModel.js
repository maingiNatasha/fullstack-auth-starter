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

// Get user profile
export const getUserProfile = async (id) => {
    const [rows] = await pool.query("SELECT * FROM user_profiles WHERE user_id = ?", [id]);
    return rows[0] || null;
};

// Insert and update user profile
export const saveUserProfile = async (userId, data) => {
    const { firstname, lastname, username } = data;

    const [result] = await pool.query(
        `INSERT INTO user_profiles (user_id, firstname, lastname, username)
         VALUES (?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           firstname = VALUES(firstname),
           lastname = VALUES(lastname),
           username = VALUES(username)`,
        [userId, firstname, lastname, username]
    );

    // Return the current profile
    return { userId, firstname, lastname, username };
};