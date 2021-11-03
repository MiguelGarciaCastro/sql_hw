
const inquirer = require("inquirer");
const connection = require("./config/connection");



console.log(`╔═════════════════════════════════════════════════════╗
║                                                     ║
║     _____                 _                         ║
║    | ____|_ __ ___  _ __ | | ___  _   _  ___  ___   ║
║    |  _| | '_ \` _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\  ║
║    | |___| | | | | | |_) | | (_) | |_| |  __/  __/  ║
║    |_____|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___|  ║
║                    |_|            |___/             ║
║                                                     ║
║     __  __                                          ║
║    |  \\/  | __ _ _ __   __ _  __ _  ___ _ __        ║
║    | |\\/| |/ _\` | '_ \\ / _\` |/ _\` |\/ _ \\ '__|       ║
║    | |  | | (_| | | | | (_| | (_| |  __/ |          ║
║    |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|          ║
║                              |___/                  ║
║                                                     ║
\╚═════════════════════════════════════════════════════╝
`);

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    employeeInfo();
});

function employeeInfo() {
    inquirer.prompt({
        message: "Select a Option",
        type: "list",
        choices: [
            "View all Employees",
            "View all Departments",
            "Add Employee",
            "Add Department",
            "Add Role",
            "Update Employee Role",
            "Delete Employee",
            "QUIT"
        ],
        name: "choice"
    }).then(answers => {
        console.log(answers.choice);
        switch (answers.choice.toLowerCase()) {
            case "view all employees":
                viewEmployees()
                break;

            case "view all departments":
                viewDepartments()
                break;

            case "add employee":
                addEmployee()
                break;

            case "add department":
                addDepartment()
                break;

            case "add role":
                addRole()
                break;

            case "update employee role":
                updateEmployeeRole();
                break;

            case "delete employee":
                deleteEmployee();
                break;

            default:
                connection.end()
                break;
        }
    })
}

function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, data) {
        console.table(data);
        employeeInfo();
    })
}

function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, data) {
        if (err) {
            console.error();
        }
        console.table(data);
        employeeInfo();
    })
}

function addEmployee() {
    inquirer.prompt([{
        type: "input",
        name: "firstName",
        message: "Employees First name?"
    },
    {
        type: "input",
        name: "lastName",
        message: "Employees Last name?"
    },
    {
        type: "number",
        name: "roleId",
        message: "Employees Role ID"
    },
    {
        type: "number",
        name: "managerId",
        message: "Employees Manager's ID?"
    }
    ]).then(function (res) {
        connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [res.firstName, res.lastName, res.roleId, res.managerId], function (err, data) {
            if (err) throw err;
            console.table("Successfully Inserted");
            employeeInfo();
        })
    })
}

function addDepartment() {
    inquirer.prompt([{
        type: "input",
        name: "Department",
        message: "Department Added?"
    },]).then(function (res) {
        connection.query('INSERT INTO department (name) VALUES (?)', [res.department], function (err, data) {
            if (err) throw err;
            console.table("Successfully Inserted");
            employeeInfo();
        })
    })
}

function addRole() {
    inquirer.prompt([
        {
            message: "Title:",
            type: "input",
            name: "title"
        }, {
            message: "Salary:",
            type: "number",
            name: "salary"
        }, {
            message: "Department ID:",
            type: "number",
            name: "department_id"
        }
    ]).then(function (response) {
        connection.query("INSERT INTO roles (title, salary, department_id) values (?, ?, ?)", [response.title, response.salary, response.department_id], function (err, data) {
            console.table(data);
        })
        employeeInfo();
    })

}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            message: "employee update? (first name please)",
            type: "input",
            name: "name"
        }, {
            message: "enter new role ID:",
            type: "number",
            name: "role_id"
        }
    ]).then(function (response) {
        connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [response.role_id, response.name], function (err, data) {
            console.table(data);
        })
        employeeInfo();
    })

}

function deleteEmployee() {

    connection.query("SELECT * FROM employee", function (err, data) {
        if (err) {
            console.error(err)
        }
        console.log(data);
        // option 1 create array to hold  employee IDS
            const employeeIdList = []
        // loop over employees and  push IDS to employeeIdList
            for (let i = 0; i < data.length; i++) {
                const employee = data[i]
                employeeIdList.push(employee.id)
                
            }
            console.log(employeeIdList)
        // option 2 is to do a SQL query for only the employee IDs and show that as the choices list.
        
        
        // either option: use employeeIdList as choices array with inquirer to prompt user which employee they would like to delete
        inquirer.prompt([
            {
                message: "which employee would you like to delete? (use id only)",
                type: "list",
                name: "employeeId",
                choices: [data.length]
            }
        ]).then(function (response) {
            // Change select to delete the employee 
            connection.query("SELECT * FROM employee WHERE id = ?", [response.employeeId], function (err, data) {
                if (err) {
                    console.error(err)
                }

                console.table(data);
                employeeInfo();

            })
        })
    })

}
