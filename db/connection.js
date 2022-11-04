const { process_params } = require('express/lib/router');
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'employee_db',
    port:3306,
    multipleStatements: true
});

module.exports = db;
