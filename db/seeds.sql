INSERT INTO department (name)
VALUES ("Billing"),
       ("HR");

INSERT INTO role (title, salary, department_id)
VALUES ("Coordinator", 50000, 1),
       ("Recruiter", 80000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tony", "Stark", 1, NULL),
       ("James", "Bond", 2, 1);