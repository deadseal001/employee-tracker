const inquirer=require('inquirer');
const cTable=require('console.table');
const db = require('./db/connection');
const mysql = require('mysql2');

promotequestions=()=>{
    inquirer.prompt ([
        {
          type: 'list',
          name: 'choice', 
          message: 'What would you like to do?',
          choices: [// 
                    //
                    'View all employees',
                    'Add an employee',
                    'Update an employee role',
                    'View all roles', 
                    'Add a role', 
                    'View all departments',
                    'Add a department', 
                    'Quit'
                    ]
                    //'Update an employee manager',
                    //"View employees by department",
                    //'Delete a department',
                    //'Delete a role',
                    //'Delete an employee',
                    //'View department budgets',
                    //'No Action']
        }
      ])
      .then((answer)=>{
        switch (answer){
            case "View all employees":
                //function ();
                break;
            case "Add an employee":
                //function ();
                break;
            case "Update an employee role":
                //function ();
                break;
            case "View all roles":
                //function ();
                break;
            case "View all departments":
                //function ();
                break;
            case "Add a department":
                //function ();
                break;
            case "Quit":
                //function ();
                break;
            default:
                break;
        }
      })
}





module.exports={
    promotequestions,

};