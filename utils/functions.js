const inquirer=require('inquirer');
const cTable=require('console.table');
const db = require('../db/connection');
const mysql = require('mysql2');
const chalk = require('chalk');

const promotequestions=()=>{
    inquirer.prompt (
        {
          type: 'list',
          name: 'choice', 
          message: 'What would you like to do?',
          choices: [
                    'View all employees',
                    'Add an employee',
                    'Update an employee role',
                    'View all roles', 
                    'Add a role', 
                    'View all departments',
                    'Add a department', 
                    'Update an employee manager',
                    'View employees by department',
                    'Delete department',
                    'Delete role',
                    "Delete an employee",
                    'Quit'
                    ]

        }
    )
    .then((answer)=>{
        //console.log(answer);
        switch (answer.choice){
            case 'View all employees':
                console.log('show all employees.');
                showallemployee();
                break;
            case 'Add an employee':
                addemployee();
                break;
            case 'Update an employee role':
                updateEmployeeRole();
                break;
            case "View all roles":
                viewRoles();
                break;
            case "Add a role":
                addRole();
                break;
            case 'View all departments':
                viewDeparments();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Update an employee manager':
                updateEManage();
                break;
            case 'View employees by department':
                viewbyDepart();
                break;
            case 'Delete department':
                deleteDepart();
                break;
            case 'Delete role':
                deleteRole();
                break;
            case 'Delete an employee':
                deleteEmployee();
                break;
            case 'Quit':
                db.end();
                break;
            default:
                promotequestions();
                break;
        }
    })
};

const showallemployee=()=>{
    let sql=`SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title as "Title", d.name AS "Department", IFNULL(r.salary, 'No Data') AS "Salary", CONCAT(m.first_name," ",m.last_name) AS "Manager"
    FROM employees e
    LEFT JOIN roles r 
    ON r.id = e.role_id 
    LEFT JOIN departments d 
    ON d.id = r.department_id
    LEFT JOIN employees m ON m.id = e.manager_id
    ORDER BY e.id;`
    db.query(sql,(err,results)=>{
        if (err) throw err;
        console.table(chalk.yellow('All Employees'), results);
        promotequestions();
    })
}

const addemployee=() =>{
    let sql=`SELECT * FROM roles; 
    SELECT id, CONCAT(first_name," ",last_name) AS "full_name" FROM employees`;
    
    db.query(sql,(err,results)=>{
        if (err) throw err;
        inquirer.prompt ([
            {
                type:"input",
                name:"newFirstName",
                message: "Please enter the new employee's first name: (required)",
                validate: nameInput =>{
                    if (nameInput.trim()) {
                        return true;
                    } else {
                        console.log(chalk.redBright('Please enter the first name of the new employee!'));
                        return false;
                    }
                }
            },
            {
                type: "input",
                name: "newLastName",
                message: "Please eneter the new employee's last name: (required)",
                validate:nameInput =>{
                    if (nameInput.trim()) {
                        return true;
                    } else {
                        console.log(chalk.redBright('Please enter the last name of the new employee!'));
                        return false;
                    }
                }
            },
            {
                type: "list",
                name: "newRole",
                message: "Please choose the employee's role: (required)",
                choices:function (){
                    return results[0].map(e=>e.title);
                }
            },
            {
                type:"list",
                name:"newEManager",
                message: "Please choose new employee's manager",
                choices: function (){
                    return results[1].map(e=>e.full_name);
                }
            }
        ])
        .then((answer)=>{
            // console.log(answer);
            let sql=`insert into employees (first_name,last_name, role_id, manager_id) 
            values (?,?,(select id from roles where title = ? ),(select id from (select id from employees where concat(first_name," ",last_name) = ? ) AS tmpt));`;
            db.query(sql,[answer.newFirstName.trim(), answer.newLastName.trim(), answer.newRole, answer.newEManager],(err,result)=>{
                if (err) throw err;
                console.log(chalk.yellow("New employee "+answer.newFirstName.trim()+" " + answer.newLastName.trim()+"added."));
                promotequestions()
            });
        })
    })
}

const updateEmployeeRole=()=>{
    let sql=`select concat (first_name," ",last_name) as name from employees; select title from roles`;
    db.query(sql,(err, results)=>{
        if (err) throw err;
        inquirer.prompt([
            {
                type:'list',
                name:'emName',
                message: 'Please select an employee to update his/her role:',
                choices: results[0].map(e=>e.name)
            },
            {
                type:'list',
                name:'newRole',
                message: 'Please select a new role for the employee:',
                choices: results[1].map(e=> e.title)
            }
        ])
        .then((answer)=>{
            db.query(`update employees 
            set role_id =(select id from roles where title = ?) 
            where concat(first_name,' ',last_name)=?
            ;`,
            [answer.newRole,answer.emName], (err, results)=>{
                if (err) throw err;
                console.log(chalk.yellow(answer.emName+"'s role has been updated as "+answer.newRole+"."));
                promotequestions();
            });
        })
    });
};

const viewRoles=()=>{
    let sql=`select title as "Title", salary as "Salary", d.name as "Department" from roles r left join departments d on d.id =r.department_id;`;
    db.query(sql,(err,results)=>{
        if (err) throw err;
        console.table(chalk.blueBright("All Roles"), results);
        promotequestions();
    });
}

const addRole=()=>{
    const sql=`select * from departments; select title as "Title", salary as "Salary", d.name as "Department" from roles r left join departments d on d.id =r.department_id;`;
    db.query(sql,(err,results)=>{
        if (err) throw err;
        console.table(chalk.blueBright('Current roles:'),results[1]);
        inquirer.prompt([
            {
                type: 'input',
                name: 'newTitle',
                message: 'Please enter the new title:',
                validate:titleInput =>{
                    if (titleInput.trim()) {
                        return true;
                    } else {
                        console.log(chalk.redBright("New tile can't be empty!"));
                        return false;
                    }
                }
            },
            {
                type:'input',
                name: 'newSalary',
                message: 'Please enter the salary for the new role:',
                validate:salaryInput =>{
                    if (salaryInput.trim()) {
                        return true;
                    } else {
                        console.log(chalk.redBright("New role's salary can't be empty!"));
                        return false;
                    }
                }                
            },
            {
                type: 'list',
                name: 'newDepartment',
                choices: results[0].map(e=>e.name)
            }
        ])
        .then((answer)=>{
            let sql=`insert into roles (title, salary, department_id) values (?,?,(select id from departments where name = ?));`;
            db.query(sql,[answer.newTitle,answer.newSalary,answer.newDepartment],(err,results)=>{
                if (err) throw err;
                console.log(chalk.blueBright("New role "+ answer.newTitle+" has been added!"));
                promotequestions();
            })
        })
    })
}

const viewDeparments=()=>{
    let sql= 'select name as "Department Name" from departments';
    db.query(sql,(err,results)=>{
        if (err) throw err;
        console.table (chalk.blueBright("All Departments"), results);
        promotequestions();
    })
}

const addDepartment=()=>{
    const sql=`select name as "Department Name" from departments;`;
    db.query(sql,(err,results)=>{
        if (err) throw err;
        console.table(chalk.blueBright('Current Departments:'),results);
        inquirer.prompt([
            {
                type:'input',
                name: 'newDepartment',
                message: 'Please enter the new department name:',
                validate: newDinput=>{
                    if (newDinput.trim()){
                        return true;
                    } else {
                        console.log(chalk.redBright("New Department Name can't be empty!"))
                    }
                }
            }
        ])
        .then((answer)=>{
            let sql= `insert into departments (name) values (?);`;
            db.query(sql,answer.newDepartment,(err,results)=>{
                if (err) throw err;
                console.log(chalk.blueBright("New department "+ answer.newDepartment +" has been added!"));
                promotequestions();
            })
        })
    })
}

const updateEManage=()=>{
    let sql =`select concat (first_name," ",last_name) as name from employees;`
    db.query(sql, (err,results)=>{
        if (err)  throw err;
        inquirer.prompt([
            {
                type:'list',
                name:'eName',
                message: 'Please select an employee to update his/her manager:',
                choices: results.map(e=>e.name)
            },
            {
                type:'list',
                name:'nMName',
                message: 'Please select the new manager of the employee:',
                choices: results.map(e=>e.name)
            }
        ])
        .then((answer)=>{
            db.query(`update employees 
            set manager_id = (select id from (select id from employees where concat(first_name," ",last_name) = ? ) AS tmpt)
            where concat(first_name,' ',last_name)=?`,[answer.nMName, answer.eName],(err,result)=>{
                if (err) throw err;
                console.log(chalk.yellow(answer.eName+"'s manager is updated as "+answer.nMName+"!"));
                promotequestions();
            })
        })

    })
}

const viewbyDepart=()=>{
    //add function
    db.query(`select name from departments`,(err,results)=>{
        if (err) throw err;
        inquirer.prompt([
            {
                type:'list',
                name:'dName',
                message: 'Please select a department to view employees:',
                choices: results.map(e=>e.name)
            }
        ])
        .then(answer=>{
            let sql=`SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title as "Title", IFNULL(r.salary, 'No Data') AS "Salary", CONCAT(m.first_name," ",m.last_name) AS "Manager"
            FROM employees e
            LEFT JOIN roles r 
            ON r.id = e.role_id 
            LEFT JOIN departments d 
            ON d.id = r.department_id
            LEFT JOIN employees m ON m.id = e.manager_id
            WHERE d.id=(select id from departments where name =?)
            ORDER BY e.id;`
            db.query(sql,answer.dName, (err,result)=>{
                if (err) throw err;
                console.table(chalk.blueBright('The list of employees from Department of '+answer.dName),result);
                promotequestions();
            });
        })
    });
};

const deleteDepart=()=>{
    db.query(`select name from departments`,(err,results)=>{
        if (err) throw err;
        inquirer.prompt([
            {
                type:'list',
                name:'dName',
                message: chalk.redBright('Please select a department to delete:'),
                choices: results.map(e=>e.name)
            }
        ])
        .then(answer=>{
            console.log(answer.dName);
            db.query(`delete from departments where name= ?`,answer.dName, (err)=>{
                if (err) throw err;
                console.log(chalk.yellow('Department of '+answer.dName + ' has been deleted.'));
                promotequestions();
            });
        })
    });
};

const deleteRole=()=>{
    db.query(`select title from roles`,(err,results)=>{
        inquirer.prompt([
            {
                type:'list',
                name:'rName',
                message: chalk.redBright('Please select a role to delete:'),
                choices: results.map(e=>e.title)
            }
        ])
        .then(answer=>{
            console.log(answer.rName);
            db.query(`delete from roles where title= ?`,answer.rName, (err)=>{
                if (err) throw err;
                console.log(chalk.yellow('Role of '+answer.rName + ' has been deleted.'));
                promotequestions();
            });
        })
    });
};

const deleteEmployee=()=>{
    let sql=`select concat (first_name," ",last_name) as name from employees;`;
    db.query(sql,(err, results)=>{
        if (err) throw err;
        inquirer.prompt([
            {
                type:'list',
                name:'name',
                message: 'Please select an employee to delete:',
                choices: results.map(e=>e.name)
            }
        ])
        .then(answer=>{
            db.query(`delete from employees where concat (first_name," ",last_name)= ?`,answer.name, (err,results)=>{
                if (err) throw err;
                console.log(chalk.yellow('Empolyee '+ answer.name+' has been deleted.'));
                promotequestions();
            });
        })
    })
}

module.exports= promotequestions;
