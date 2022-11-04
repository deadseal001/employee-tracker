DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db; 

CREATE TABLE departments (
    id INTEGER  AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(35) NOT NULL
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(35) NOT NULL, 
    salary DECIMAL NOT NULL,
    department_id INTEGER, 
    INDEX dep_ind (department_id),
    CONSTRAINT fk_department 
    FOREIGN KEY (department_id) 
    REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT  PRIMARY KEY NOT NULL,
    first_name VARCHAR(35) NOT NULL,
    last_name VARCHAR(35) NOT NULL,
    role_id INTEGER, 
    INDEX role_id (role_id),
    CONSTRAINT fk_role 
    FOREIGN KEY (role_id) 
    REFERENCES roles(id) 
    ON DELETE CASCADE,
    manager_id INTEGER
    REFERENCES employees(id) 
    ON DELETE CASCADE 
);