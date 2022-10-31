const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '658Leiothrix.',
    database: 'employee_db',
    multipleStatements: true
});

module.exports = db;
