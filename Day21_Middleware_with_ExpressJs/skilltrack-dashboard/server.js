const fs = require("fs");
const path = require("path");

// Built-in Middleware for Body parsing (User Story 3)
const express = require("express");
// Logging Middleware Using morgan (User Story 4)
const morgan = require("morgan");
// Custom Request Logging Middleware (User Story 1)
const requestLogger = require("./middlewares/requestLogger");
// Validation Middleware for Student Routes (User Story 2)
const validateStudent = require("./middlewares/validateStudent");
// Error Handling Middleware (User Story 5)
const errorHandler = require("./middlewares/errorHandler");


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(morgan("dev"));

// Template Engine Setup
app.set("view engine", "ejs");


// Utility function to read students.json
const getStudents = () => {
    const data = fs.readFileSync(path.join(__dirname, "data/students.json"), "utf-8");
    return JSON.parse(data);
};

// Utility function to write/update students.json
const saveStudents = (students) => {
    fs.writeFileSync(
        path.join(__dirname, "data/students.json"),
        JSON.stringify(students, null, 2)
    );
};


// Routes

// Home Page
app.get("/", (req, res) => {
    res.render("index", { title: "SkillTrack Dashboard" });
});

// List Students
app.get("/students", (req, res) => {
    const students = getStudents();
    res.render("students", { students });
});

// Home Route (JSON response)
// app.get("/", (req, res) => {
//     res.json({
//         message: "Welcome to SkillTrack Dashboard API",
//         endpoints: {
//             list_students: "/students",
//             add_student: "/students (POST)"
//         }
//     });
// });

// // List Students (JSON only)
// app.get("/students", (req, res) => {
//     const students = getStudents();
//     res.json({
//         success: true,
//         total: students.length,
//         students
//     });
// });

// Add New Student
app.post("/students", validateStudent, (req, res) => {
    const students = getStudents();
    const { name, email } = req.body;

    const newStudent = {
        id: students.length + 1,
        name,
        email,
        progress: 0
    };

    students.push(newStudent);
    saveStudents(students);

    res.status(201).json({
        success: true,
        message: "Student added successfully!",
        data: newStudent
    });
});


// Use error handler
app.use(errorHandler);

// Start Server
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
