-- Step 1: Create Database
CREATE DATABASE IF NOT EXISTS EduProLearning;
USE EduProLearning;

-- Department Table
CREATE TABLE Department (
    DeptID INT PRIMARY KEY AUTO_INCREMENT,
    DeptName VARCHAR(100) NOT NULL UNIQUE
);

-- Student Table
CREATE TABLE Student (
    StudentID VARCHAR(10) PRIMARY KEY,
    StudentName VARCHAR(100) NOT NULL
);

-- Instructor Table
CREATE TABLE Instructor (
    InstructorID INT PRIMARY KEY AUTO_INCREMENT,
    InstructorName VARCHAR(100) NOT NULL,
    DeptID INT,
    FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
);

-- Course Table
CREATE TABLE Course (
    CourseID INT PRIMARY KEY AUTO_INCREMENT,
    CourseName VARCHAR(100) NOT NULL,
    DeptID INT,
    FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
);

-- Enrollment Table (junction table)
CREATE TABLE Enrollment (
    StudentID VARCHAR(10),
    CourseID INT,
    InstructorID INT,
    Grade CHAR(2),
    PRIMARY KEY (StudentID, CourseID),
    FOREIGN KEY (StudentID) REFERENCES Student(StudentID),
    FOREIGN KEY (CourseID) REFERENCES Course(CourseID),
    FOREIGN KEY (InstructorID) REFERENCES Instructor(InstructorID)
);


-- Step 3: Insert Sample Data

-- Department data
INSERT INTO Department (DeptName) VALUES
('Computer Science'),
('Information Technology');

-- Student data
INSERT INTO Student (StudentID, StudentName) VALUES
('S101', 'Asha Gupta'),
('S102', 'Raj Verma'),
('S103', 'Priya Nair'),
('S104', 'Amit Singh'),
('S105', 'Neha Sharma');

-- Instructor data
INSERT INTO Instructor (InstructorName, DeptID) VALUES
('Dr. Mehta', 1),
('Dr. Sharma', 1),
('Prof. Nair', 2);

-- Course data
INSERT INTO Course (CourseName, DeptID) VALUES
('Database Systems', 1),
('Data Structures', 1),
('Operating Systems', 1),
('Web Technologies', 2),
('Computer Networks', 2);

-- Enrollment data
INSERT INTO Enrollment (StudentID, CourseID, InstructorID, Grade) VALUES
('S101', 1, 1, 'A'),
('S102', 2, 2, 'B'),
('S101', 2, 2, 'A'),
('S103', 3, 1, 'B'),
('S104', 4, 3, NULL);

-- Step 4: Queries (Reports)


-- Retrieve list of students with their enrolled course names and instructors
SELECT 
    s.StudentName,
    c.CourseName,
    i.InstructorName
FROM Enrollment e
JOIN Student s ON e.StudentID = s.StudentID
JOIN Course c ON e.CourseID = c.CourseID
JOIN Instructor i ON e.InstructorID = i.InstructorID;

-- Display all courses along with their department names (INNER JOIN)
SELECT 
    c.CourseName,
    d.DeptName
FROM Course c
INNER JOIN Department d ON c.DeptID = d.DeptID;

-- Retrieve all students and the courses they are enrolled in, including those who have not yet been assigned a grade (LEFT JOIN)
SELECT 
    s.StudentName,
    c.CourseName,
    e.Grade
FROM Student s
LEFT JOIN Enrollment e ON s.StudentID = e.StudentID
LEFT JOIN Course c ON e.CourseID = c.CourseID;

-- List instructors who currently have no students assigned (RIGHT JOIN)
SELECT 
    i.InstructorName,
    c.CourseName
FROM Enrollment e
RIGHT JOIN Instructor i ON e.InstructorID = i.InstructorID
LEFT JOIN Course c ON e.CourseID = c.CourseID
WHERE e.StudentID IS NULL;

-- Retrieve all students who scored the highest grade (‘A’) in any course
SELECT 
    s.StudentID,
    s.StudentName,
    c.CourseName,
    e.Grade
FROM Enrollment e
JOIN Student s ON e.StudentID = s.StudentID
JOIN Course c ON e.CourseID = c.CourseID
WHERE e.Grade = 'A';

-- Find the courses where the average grade is highest using a subquery

SELECT 
    c.CourseName,
    ROUND(AVG(
        CASE e.Grade
            WHEN 'A' THEN 4
            WHEN 'B' THEN 3
            WHEN 'C' THEN 2
            WHEN 'D' THEN 1
            ELSE 0
        END
    ),2) AS AvgGradeValue
FROM Enrollment e
JOIN Course c ON e.CourseID = c.CourseID
GROUP BY c.CourseID, c.CourseName
HAVING AvgGradeValue = (
    SELECT MAX(AvgSub)
    FROM (
        SELECT 
            AVG(
                CASE Grade
                    WHEN 'A' THEN 4
                    WHEN 'B' THEN 3
                    WHEN 'C' THEN 2
                    WHEN 'D' THEN 1
                    ELSE 0
                END
            ) AS AvgSub
        FROM Enrollment
        GROUP BY CourseID
    ) AS SubQuery
);


-- Display instructors who teach more than one course (using correlated subquery)
SELECT 
    i.InstructorID,
    i.InstructorName
FROM Instructor i
WHERE (
    SELECT COUNT(DISTINCT c.CourseID)
    FROM Course c
    JOIN Enrollment e ON e.CourseID = c.CourseID
    WHERE e.InstructorID = i.InstructorID
) > 1;

-- List students who have not enrolled in any course (using subquery with NOT IN)
SELECT 
    s.StudentID,
    s.StudentName
FROM Student s
WHERE s.StudentID NOT IN (
    SELECT DISTINCT e.StudentID
    FROM Enrollment e
);