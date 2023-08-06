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
        'Update an employee role'],
  },])
  .then(answers => {
    console.info('Answer:', answers.trackQuestions);
    if  (answers = "View all departments") {
        connection.query('SELECT department.name AS `department name`, role.department_id AS `department ids` FROM department JOIN role ON role.department_id = department.id', function (err, results) {
            if (err) {
                console.log(err);
              }
            console.log(results);
          });
    }
    if (answers = "View all roles") {
        connection.query('SELECT role.title AS `job title`, role.id AS `role id`, department.name AS `department name`, role.salary FROM department JOIN role ON role.department_id = department.id', function (err, results) {
            if (err) {
                console.log(err);
              }
            console.log(results);
        });
    }
  });



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
