const pool = require("../db/db");

exports.registerUser = async (name, email, password) => {
    const query = "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id";
    const result = await pool.query(query, [name, email, password]);

    return result.rows[0];
}

exports.asignUserRole = async (userId, roleId) => {
    const query = "INSERT INTO user_roles (user_id, role_id) VALUES ($1,$2) RETURNING *";
    const result = await pool.query(query, [userId, roleId]);

    return result.rows[0];
}

exports.getRoleId = async (role) => {
    const query = "SELECT id FROM roles WHERE name = $1";
    const result = await pool.query(query, [role]);

    return result.rows[0];
}

exports.findByEmail = async (email) => {
    const query = "Select * FROM users WHERE email =$1";
    const result = await pool.query(query, [email]);

    return result.rows[0];
}