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
                case "Add an employee":
                    addEmployee()
                    break;
                case 'Update an employee role':
                    updateEmployee()
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
        start()
    });
}

function allEmployees() {
    connection.query('SELECT employee.id AS `employee id`, employee.first_name AS `first name`, employee.last_name AS `last name`, role.title, department.name AS `department name`, role.salary, manager.first_name AS `manager first name`, manager.last_name AS `manager last name` FROM employee  JOIN role ON employee.role_id = role.id  JOIN department ON role.department_id = department.id JOIN employee AS manager ON manager.id = employee.manager_id', function (err, results) {
        if (err) {
            console.log(err);
        }
        console.table(results);
        start()
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
        const { title, department_id, salary } = answers;

        // Insert the new role into the database
        const sql = 'INSERT INTO role (title, department_id, salary) VALUES (?, ?, ?)';
        connection.query(sql, [title, department_id, salary], (err, results) => {
            if (err) throw err;

            console.log('Role added successfully!');
        start();
    });
});
});
}

function addEmployee() {
    // create a list of available departments
    connection.query('select id, title from role', (err, result)=> {
        const roleList = result.map((role)=>({
            name: role.title,
            value: role.id
        }));
        connection.query('select * from employee', (err, result)=> {
            const mgrlist = result.map((mgr)=>({
                name:`${mgr.first_name} ${mgr.last_name}`,
                value: mgr.id
            }));
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the Employee first name?',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the Employee Last name?',
        },
        {
            type: 'list',
            name: 'role',
            choices: roleList,
            message: 'What is the Employee role?',
        },
        {
            type: 'list',
            name: 'manager',
            choices: mgrlist,
            message: 'Who is the employee manager?',
        },
    ])
    .then(res => {
        const { firstName, lastName, role, manager } = res;
                    const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
                    connection.query(sql, [firstName, lastName, role, manager], (err, results) => {
                        if (err) throw err;

                        console.log('Employee added successfully!');
                        start();  // Assuming 'start' is defined and has the appropriate functionality
                    });
                });
        });
    });
}


function updateEmployee() {

    connection.query('select first_name, last_name, id from employee', (err, result)=> {
        const empList = result.map((employee)=>({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
        }));
        connection.query('select title, id from role', (err, result)=> {
            const rolelist = result.map((role)=>({
                name: role.title,
                value: role.id
            }));
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'empId',
            choices: empList,
            message: 'Which employee do you want to update?',
        },
        {
            type: 'list',
            name: 'roleId',
            choices: rolelist,
            message: 'Which role do you want to assign the selected employee?',
        }
    ])
    .then(res => {
        const { empId, roleId } = res;
                    const sql = 'UPDATE employee SET role_id=? WHERE id =?';
                    connection.query(sql, [roleId, empId], (err, results) => {
                        if (err) throw err;

                        console.log('Updated Employee role');
                        start();  // Assuming 'start' is defined and has the appropriate functionality
                    });
                });
        });
    });
}
