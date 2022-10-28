const inquirer=require('inquirer');
const mysql=require('mysql2');
const cTable=require('console.table');


const connection=mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '658Leiothrix.',
    database:'employee_db'
});

