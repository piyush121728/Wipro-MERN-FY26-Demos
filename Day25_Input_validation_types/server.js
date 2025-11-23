// After implementing both joi and express-validator based validation in the server.js file,
// we can now handle user input validation using either of the two libraries as needed in different routes.
//Explanation of the code:
// 1. We import the necessary validation middleware from both Joi and express-validator.
// 2. We define a /signup route that uses express-validator for input validation.
// 3. We send a success response if the validation passes and the route is accessed successfully.
// joi and express-validationator based validation middleware will be used in the routes

const express = require('express');
const userRoutes = require('./routes/userRoutes'); // Importing user routes
const app = express();
const PORT = process.env.PORT || 3000;
const joiMiddleware = require('./joi/joiMiddleware'); // Importing Joi validation middleware
const { signupValidationRules } = require('./express-validator/userValidation'); // Importing express-validator rules
const validateResult = require('./express-validator/ValidationResult'); // Importing validation result handler
app.use(express.json()); // Middleware to parse JSON request bodies
// app.use('/api/users', userRoutes); // Using user routes for /api/users endpoint
app.use('/routes', userRoutes); // Using user routes for /routes endpoint
app.post('/', (req, res) => {
    res.send('Welcome to the Express server with validation!');
});
//want to implement express validator for signup route with success message
app.post('/signup', signupValidationRules, validateResult, (req, res) => {
    res.json({ success: true, message: 'Signup route - implemented with express-validator' });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});