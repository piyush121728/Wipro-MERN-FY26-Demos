const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Piyush, Welcome to Express.js!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});