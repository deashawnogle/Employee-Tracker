INSERT INTO department (name)

VALUE ("Engineering"), ("Finance"), ("Legal"), ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES  ('Lead Developer', 150000, 1),
        ('Software Developer', 125000, 1),
        ('Accounting Manager', 75000, 2),
        ('Accountant', 65000, 2),
        ('Legal Team Lead', 200000, 3),
        ('Lawyer', 170000, 3),
        ('Salesperson', 60000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Mike", "Chan", 1, NULL),
        ("Ashley", "Rodriguez", 2, NULL),
        ("Kevin", "Tupik", 3, NULL),
        ("Kunal", "Singh", 4, NULL),
        ("Malia", "Brown", 5, NULL),
        ("Sarah", "Lourd", 6, NULL),
        ("Tom", "Allen", 7, NULL);
        