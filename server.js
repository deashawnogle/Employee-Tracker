//Dependencies
const inquirer = require('inquirer');
const util = require('util')
const mysql = require('mysql2');
const connection = require ("./db/connection.js");
const figlet = require('figlet');

const consoleTable = require("console.table");
const { response } = require('express');
// const { response } = require('express');

//logo
console.log('\n')

figlet('Employee Tracker', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
    console.log('\n')
    console.log('\n')
    console.log('\n')
});

//inquirer prompts
const mainPrompts = () => {

    inquirer.prompt([
        {
            type:"list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                    {
                        name: " View All Departments",
                        value: "viewDepartments"
                    },
                    {
                        name: "View All Employees",
                        value: "viewEmployees"
                    },
                    {
                        name: "View All Roles",
                        value: "viewRoles"
                    },
                    {
                        name: "Add Employee",
                        value: "addEmployee"
                    },
                    {
                        name: "Add Department",
                        value: "addDepartment"
                    },
                    {
                        name: "Add Role",
                        value: "addRole"
                    },
                    {
                        name: "Update Role",
                        value: "updateRole"
                    },
                    {
                        name: "Exit",
                        value: "exit"
                    }
                ]
            }
        ]).then((response) => {
            switch (response.choice) {
                
                case "viewEmployees":
                        viewEmployees()
                        break;
                        
                case "viewRoles":
                        viewRoles();
                        break;
                
                case "addEmployee":
                    addEmployee();
                    break;
                
                case "addDepartment":
                    addDepartment();
                    break;
                
                case "addRole":
                    addRole();
                    break;
                
                case "updateRole":
                    updateRole();
                    break;
                
                case "viewDepartments":
                    viewDepartments();
                    break;
            
                case "exit":
                    connection.end();
                    break;
                }
            })
        }

connection.connect(() => {
    mainPrompts()
});

//view all Department
const viewDepartments = () => {
        connection.promise().query(
            "SELECT * FROM department;"
        ).then(([response]) => {
            console.table(response)
        }).then(() => mainPrompts()
        )
    };

//view all Employees
const viewEmployees = () => {
    connection.promise().query(
        "SELECT * FROM employee;"
    ).then(([response]) => {
        console.table(response)
    }).then(() => mainPrompts()
    )
};

//view Job titles
const viewRoles = () => {
    connection.promise().query(
        "SELECT * FROM role;"
    ).then(([response]) => {
        console.table(response)
    }).then(() => mainPrompts()
    )
};

// Add department
const addDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "Add Department"
        }
    ]).then(res => {
        connection.promise().query(
            "INSERT INTO department (name) VALUES(?)", [res.department]
        ).then(([response]) => {
            viewDepartments()
        })
    })
};

//add Role
const addRole = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is title of the role?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the Salary of Role?"
        },
        {
            type: "input",
            name: "department_id",
            message: "What is the Department ID?"
        }
    ]).then(res => {
        connection.promise().query(
            "INSERT INTO role (title, salary, department_id) VALUES(?, ?, ?, ?)", [res.title, res.salary, res.department_id]
        ).then(([response]) => {
            viewRoles()
        })
    })
};

//add Role
const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is first name of employee?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is last name of employee?"
        },
        {
            type: "input",
            name: "role_id",
            message: "What is the job title of employee?"
        }
    ]).then(res => {
        connection.promise().query(
            "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)", [res.first_name, res.last_name, parseInt(res.role_id), null]
        ).then(([response]) => {
            viewEmployees()
        })
    })
};

//update Role
const updateRole = () => {
    connection.promise().query("SELECT * from employee")
    .then(([response]) => {
        inquirer.prompt([
            {
                type: "list",
                name: "employee",
                message: "Which employee role needs to be update?",
                choices: employeeChoices
            }
        ]).then((res) => {
            const updateEmployeeRole = res.employee
            connection.promise().query("SELECT role.id, role.title FROM role")
            .then(([response]) => {
                inquirer.prompt([
                    {
                        type: "list",
                        name: "viewRoles",
                        message: "Which one is the new role?",
                        choices: [connection.promise().query(`SELECT * FROM role`)]
                    }
                ]).then((res) => {
                    connection.promise().query("UPDATE employee SET role_id = ? WHERE id = ?", [res.viewRoles, updateEmployeeRole])
                    .then(() => mainPrompts())
                })
            })
        })
    })
}

function exit() {
    process.exit()
};