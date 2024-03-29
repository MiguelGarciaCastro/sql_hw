USE employees_db;

--Department
INSERT INTO department (department_name)
VALUES ("Sales");
INSERT INTO department (department_name)
VALUES ("Engineering");
INSERT INTO department (department_name)
VALUES ("Finance");
INSERT INTO department (department_name)
VALUES ("Legal");

--role array
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 80000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Account Manager", 150000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 250000, 4);

--employee array
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, null); 
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ryan", "Reynolds", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jane", "Doe", 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Joshua", "Small", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Maggie", "Small", 4, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("George", "Clooney", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("James", "Brown", 6, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Allen", 7, null);