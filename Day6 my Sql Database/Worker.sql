CREATE DATABASE IF NOT EXISTS WorkerDB; -- Creating  the DB if it doesnt exist already
USE WorkerDB; -- Using the created DB
 
CREATE TABLE WORKER (
  empId INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  dept TEXT NOT NULL
);

-- insert
INSERT INTO WORKER VALUES (0001, 'Clark', 'Sales');
INSERT INTO WORKER VALUES (0002, 'Dave', 'Accounting');
INSERT INTO WORKER VALUES (0003, 'Ava', 'Sales');

-- fetch 
SELECT * FROM WORKER WHERE dept = 'Sales';