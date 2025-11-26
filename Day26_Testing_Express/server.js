// in server.js run server seprately as app.js is only for app  initialization
const app = require('./app'); // import the express app from app.js
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});