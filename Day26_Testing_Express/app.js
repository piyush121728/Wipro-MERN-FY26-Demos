// here app.js  will contain only express app initialization code

const express = require('express');
const app = express();

// simple routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/users', (req, res) => {
    const users = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' }
    ];
    res.json(users);
});

// Example middleware that adds a custom header
app.use((req, res, next) => {
    res.setHeader('X-Custom-Header', 'MyCustomHeaderValue');
    next();
});

module.exports = app;