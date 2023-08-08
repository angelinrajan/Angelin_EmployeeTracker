const inquirer = require('inquirer');
const mysql = require('mysql2');
//const fetch = require('node-fetch');

const connection = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'Serversql123$',
        database: 'emptracker_db'
    },
    console.log(`Connected to the emptracker_db database.`)
);


function start() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'trackQuestions',
                message: 'What would you like to do?',
                choices: ['View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                    'Exit'
                ],
            },])
        .then(answers => {
            switch (answers.trackQuestions) {
                case "View all departments":
                    listDepartments()
                    break;
                case "View all roles":
                    allRoles()
                    break;
                case "View all employees":
                    allEmployees();
                    break;
                case "Add a department":
                    addDepartment();
                    break;
                case "Add a role":
                    addRole()
                    break;
                case "Add a employee":

                    break;
                case 'Update an employee role':

                    break;
                default:
                    process.exit();

            }
        });

}

start()


function listDepartments() {
    connection.query('SELECT * FROM department', function (err, results) {
        if (err) {
            console.log(err);
        }
        console.table(results);
        start()
    });
}

function allRoles() {
    connection.query('SELECT role.title AS `job title`, role.id AS `role id`, department.name AS `department name`, role.salary FROM department JOIN role ON role.department_id = department.id', function (err, results) {
        if (err) {
            console.log(err);
        }
        console.table(results);
    });
}

function allEmployees() {
    connection.query('SELECT employee.id AS `employee id`, employee.first_name AS `first name`, employee.last_name AS `last name`, role.title, department.name AS `department name`, role.salary, manager.first_name AS `manager first name`, manager.last_name AS `manager last name` FROM employee  JOIN role ON employee.role_id = role.id  JOIN department ON role.department_id = department.id JOIN employee AS manager ON manager.id = employee.manager_id', function (err, results) {
        if (err) {
            console.log(err);
        }
        console.table(results);
    });
}

function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'departmentName',
                message: 'Enter the name of the new department:',
            },
        ])
        .then(res => {
            connection.query(`INSERT INTO department (name) VALUES ("${res.departmentName}")`, function (err, results) {
                if (err) {
                    console.log(err);
                }
                console.log(results);
                start()
            });
        })
}

function addRole() {
// create a list of available departments
connection.query('select * from department', (err, result)=> {
    const departmentList = result.map((dept)=>({
        name: dept.name,
        value: dept.id
    }))

    inquirer.prompt([
        {
            type: 'input', 
            name: 'title', 
            message: 'what is the name of the role you are creating?'
        },
        {
            type: 'list', 
            name: 'department_id',
            choices: departmentList,
            message: 'What department does this new role belong to?'
        }, 
        {
            type: 'input', 
            name: 'salary', 
            message: 'what is the salary of the role you are creating?'
        }
    ]).then((answers)=> {
        console.log(answers);
    })
})
}

  // Query database
// connection.query('SELECT * FROM favorite_books', function (err, results) {
//     if (err) {
//         console.log(err);
//       }
//     console.log(results);
//   });
//   .then((res) => fetch(`https://api.github.com/users/${res.username}`))
//   .then((res) => res.json())
//   .then((user) => console.log(user))
//   // Promises execution will rout to the '.catch()' callback when an error occurs in any of the promises from before.
//   .catch((err) => console.log(err));
