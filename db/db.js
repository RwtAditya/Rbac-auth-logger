const {Pool, Connection} = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const pool = new pool({
    connectionString:process.env.DATABASE_URL,
})

module.exports = pool;