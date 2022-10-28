DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db; 

CREATE TABLE department (
    id INTEGER  AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(35) NOT NULL
);

CREATE TABLE role (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(35) NOT NULL, 
    salary DECIMAL NOT NULL,
    department_id INTEGER, 
    INDEX dep_ind (department_id),
    CONSTRAINT fk_department 
    FOREIGN KEY (department_id) 
    REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT  PRIMARY KEY,
    first_name VARCHAR(35) NOT NULL,
    last_name VARCHAR(35) NOT NULL,
    role_id INTEGER, 
    INDEX role_ind (role_id),
    CONSTRAINT fk_role 
    FOREIGN KEY (role_id) 
    REFERENCES role(id) 
    ON DELETE SET NULL,
    manager_id INTEGER,
    INDEX manager_id (manager_id),
    CONSTRAINT fk_manager 
    FOREIGN KEY (manager_id) 
    REFERENCES employee(id) 
    ON DELETE SET NULL
);