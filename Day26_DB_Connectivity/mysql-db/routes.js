// in routes.js we will have API routes followed by export statements

//Step 1: Import the necessary modules
//Step 2: Define the routes for the application
//Step 3: Export the routes for use in other parts of the application

const express = require('express');
const router = express.Router();
const db = require('./db');

// Home route
router.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Get all students
router.get('/students', (req, res) => {
    db.query('SELECT * FROM students', (err, results) => {
        if (err) {
            console.error('Error fetching students:', err);
            res.status(500).send('Error fetching students');
        } else {
            res.json(results);
        }
    });
});

// Add a student
router.post('/students', (req, res) => {
    const newStudent = req.body;
    db.query('INSERT INTO students SET ?', newStudent, (err) => {
        if (err) {
            console.error('Error adding student:', err);
            res.status(500).send('Error adding student');
        } else {
            res.status(201).send('Student added successfully');
        }
    });
});

module.exports = router;
