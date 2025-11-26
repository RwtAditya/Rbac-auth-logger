const pool = require("../db/db");

//users tabel queries
exports.registerUser = async (name, email, password) => {
    const query = "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id";
    const result = await pool.query(query, [name, email, password]);

    return result.rows[0];
}

exports.findByEmail = async (email) => {
    const query = "SELECT * FROM users WHERE email =$1";
    const result = await pool.query(query, [email]);

    return result.rows[0];
}

exports.getUsers = async () => {
    const query = "SELECT * FROM users";
    const result = await pool.query(query);

    return result;
}

exports.deleteUser = async (userId) => {
    const query = "DELETE FROM users WHERE id = $1 RETURNING *";
    const result = await pool.query(query, [userId]);

    return result.rows[0];
}

exports.updateProfile = async (userId, name) => {
    const query = "UPDATE users SET name = $1 WHERE id = $2 RETURNING id, name, email";
    const result = await pool.query(query, [name,userId]);

    return result.rows[0];
}

//user_roles table queries
exports.asignUserRole = async (userId, roleId) => {
    const query = "INSERT INTO user_roles (user_id, role_id) VALUES ($1,$2) RETURNING *";
    const result = await pool.query(query, [userId, roleId]);

    return result.rows[0];
}

exports.getUserRoleId = async (userId) => {
    const query = "SELECT role_id FROM user_roles WHERE user_id = $1";
    const result = await pool.query(query, [userId]);

    return result.rows[0];
}

exports.updateUserRole = async (userId, roleId) => {
    const query = "UPDATE user_roles SET role_id = $1 WHERE user_id = $2 RETURNING *";
    const result = await pool.query(query, [roleId,userId]);

    return result.rows[0];
}


//roles table queries
exports.getRoleId = async (role) => {
    const query = "SELECT id FROM roles WHERE name = $1";
    const result = await pool.query(query, [role]);

    return result.rows[0];
}

exports.getRoleName = async (roleId) => {
    const query = "SELECT name FROM roles WHERE id = $1";
    const result = await pool.query(query, [roleId]);

    return result.rows[0];
}

//reports table queries (if exists, else remove from moderatorController)
exports.getAllReports = async () => {
    const query = "SELECT * FROM reports";
    const result = await pool.query(query);

    return result.rows;
}