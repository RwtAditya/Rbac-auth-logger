const pool = require("../db/db");


exports.addLog = async (userId, action, endpoint, method, statusCode, message) => {
    const query = "INSERT INTO logs (user_id, action, endpoint, method, status_code, message) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *";
    const result = await pool.query(query, [userId,action,endpoint,method,statusCode,message]);

    return result;
}

exports.fetchAllLogs = async () => {
    const query = "SELECT * FROM logs"
    const result = await pool.query(query);

    return result;
}

exports.filterLogs = async (userId) => {
    const query = "SELECT * FROM logs WHERE user_id =$1"
    const result = await pool.query(query, [userId]);

    return result;
}