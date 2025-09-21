const mysql = require('serverless-mysql');
require('dotenv').config();

const pool = mysql({
    config: {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: 3306
    }
});

module.exports = pool;
