const {Pool, Connection} = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const pool = new Poolool({
    connectionString:process.env.DATABASE_URL,
})

module.exports = pool;