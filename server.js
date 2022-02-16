//Dependencies
const express = require('express');
const mysql = require('mysql2');
const { table } = require('console-table-printer');
const PORT = process.env.PORT || 3001;
const app = express();

const figlet = require('figlet');

//logo
figlet('Employee Tracker', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

//inquirer prompts
const prompts = {

    mainPrompt: [
        {
            type:"list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                    {
                        name: "View All Employees",
                        value: "view_employees"
                    },
                    {
                        name: "View All Employees By Roles",
                        value: "view_employees_role"
                    },
                    {
                        name: "View All Employees By Department",
                        value: "view_employees_department"
                    },
                    {
                        name: "Add Employee",
                        value: "add_employee"
                    },
                    {
                        name: "Add Department",
                        value: "add_department"
                    },
                    {
                        name: "Add Role",
                        value: "add_role"
                    }, 
                    {
                        name: "Update Employee Role",
                        value: "update_role"
                    }, 
                    {
                        name: "Delete Employee",
                        value: "delete_employee"
                    },
                    {
                        name: "Delete Role",
                        value: "delete_role"
                    },
                    {
                        name: "Delete Department",
                        value: "delete_department"
                    },
                    {
                        name: "Exit",
                        value: "exit"
                    }
                ]
            }
        ],
    searchDepartment: [
            {
                type: "list",
                name: "department",
                message: "What department would you like to search?",
                choices: [
                    {
                    name: "Sales Department",
                    value: "Sales"
                    },
                    {
                    name: "Engineering Department",
                    value: "Engineering"
                    },
                    {
                    name: "Finance Department",
                    value: "Finance"
                    },
                    {
                    name: "Legal Department",
                    value: "Legal"
                    }
                ]
            }
        ],
    addRole: [
            {
                type: "input",
                name: "title",
                message: "Enter new role title."
            },
            {
                type: "input",
                name: "salary",
                message: "Enter salary of title."
            }
        ],
    addDepartment:[
            {
                type: "input",
                name: "name",
                message: "Enter new department name."
            }
        ],
    addEmployee: [
            {
                type: "input",
                name: "first_name",
                message: "Enter employee's first name."
            },
            {
                type: "input",
                name: "last_name",
                message: "Enter empployee's last name."
            },
            {
                type: "input",
                name: "manager_id",
                message: "Enter Manager's ID."
            }
        ]
    }