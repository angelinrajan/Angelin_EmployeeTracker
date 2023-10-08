# Angelin_EmployeeTracker

## Summary
This project involves building a command-line application using Node.js, Inquirer, and MySQL to manage a company's employee database. The application allows users to view and manage departments, roles, and employees within their organization. 

## Video Walkthrough
Link to video was not working using microsoft clipchamp so I uploaded my video to the dropbox. Link is below:
https://www.dropbox.com/scl/fi/5j56jn9rnb4mywq3yhyst/Angelin_employeeTrackerWalkThrough.webm?rlkey=ro4t7t9wulzamkcsvp63xrdxn&dl=0


## Features
- View all departments: Displays a formatted table showing department names and their respective IDs.
- View all roles: Presents the job title, role ID, department, and salary for each role.
- View all employees: Provides a formatted table with comprehensive employee information including employee IDs, first names, last names, job titles, departments, salaries, and their respective managers.
- Add a department: Allows users to add a new department to the database by entering the department's name.
- Add a role: Permits the addition of a new role by inputting the role's title, salary, and the department to which it belongs.
- Add an employee: Enables the addition of a new employee by inputting the employee's first name, last name, role, and manager.
- Update an employee role: Allows users to update an employee's role by selecting the employee and choosing a new role.

## Deployment Steps
1. Clone the repository to your local machine using
2. Navigate to the project directory
3. Install the required dependencies using `npm install`.
4. Ensure Inquirer version 8.2.4 is installed: `npm i inquirer@8.2.4`.
5. Set up the MySQL database using the provided schema.sql file.
6. Run the application using `node index.js`.
7. Follow the prompts to interact with the database and manage employees, roles, and departments effectively.

## Outside Sources
- https://www.w3schools.com/sql/
- https://www.geeksforgeeks.org/sql-tutorial/
- Tutoring Session



