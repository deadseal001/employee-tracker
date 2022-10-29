const inquirer=require('inquirer');
const cTable=require('console.table');
const mysql = require('mysql2');
const db = require('./db/connection');
//const { promotequestions, findById, createNewAnimal, validateAnimal } = require('./utils/functions');

const PORT = process.env.PORT || 3001;



db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    console.log(',-----------------------------------------------------.');
    console.log('|                                                     |');
    console.log('|    _____                 _                          |');
    console.log('|   |  ___|_ __ ___  _ __ | | ___  _   _  ___  ___    |');
    console.log("|   |  _| | '_ ` _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\   |");
    console.log("|   | |___| | | | | | |_) | | (_) | |_| |  __/| __/   |");
    console.log("|   |_____|_| |_| |_| .__/|_|\\___/ \\__, |\\___| \\__|   |");
    console.log("|                   |_|            |____/             |");
    console.log("|    __  __                                           |");
    console.log('|   |  \\/  | __ _ _ __   __ _  __ _  ___ _ __         |');
    console.log("|   | |\\/| |/ _` | '_ \\ / _` |/ _` |/ _ \\ '__|        |");
    console.log("|   | |  | | (_| | | | | (_| | (_| |  __/ |           |");
    console.log("|   |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|           |");
    console.log("|                             |___/                   |");
    console.log("|                                                     |");
    console.log("|_____________________________________________________|");

    //promotequestions();
    return;
})