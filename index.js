// const inquirer=require('inquirer');
// const cTable=require('console.table');
// const mysql = require('mysql2');
const db = require('./db/connection');
const promotequestions = require('./utils/functions');
const chalk = require('chalk');


db.connect(err => {
    if (err) throw err;
    console.log(chalk.green('Database connected.'));
    console.log(chalk.yellow(',-----------------------------------------------------.'));
    console.log(chalk.yellow('|                                                     |'));
    console.log(chalk.yellow('|    _____                 _                          |'));
    console.log(chalk.yellow('|   |  ___|_ __ ___  _ __ | | ___  _   _  ___  ___    |'));
    console.log(chalk.yellow("|   |  _| | '_ ` _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\   |"));
    console.log(chalk.yellow("|   | |___| | | | | | |_) | | (_) | |_| |  __/| __/   |"));
    console.log(chalk.yellow("|   |_____|_| |_| |_| .__/|_|\\___/ \\__, |\\___| \\__|   |"));
    console.log(chalk.yellow("|                   |_|            |____/             |"));
    console.log(chalk.yellow("|    __  __                                           |"));
    console.log(chalk.yellow('|   |  \\/  | __ _ _ __   __ _  __ _  ___ _ __         |'));
    console.log(chalk.yellow("|   | |\\/| |/ _` | '_ \\ / _` |/ _` |/ _ \\ '__|        |"));
    console.log(chalk.yellow("|   | |  | | (_| | | | | (_| | (_| |  __/ |           |"));
    console.log(chalk.yellow("|   |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|           |"));
    console.log(chalk.yellow("|                             |___/                   |"));
    console.log(chalk.yellow("|                                                     |"));
    console.log(chalk.yellow("`-----------------------------------------------------'"));

    promotequestions();
    return;
})
