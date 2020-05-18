const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT,
    user: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PSWD,
    database: process.env.DEV_DB_NAME,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool,
};