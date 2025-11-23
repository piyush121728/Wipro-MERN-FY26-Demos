// Step 1: Import necessary modules
const express = require('express');
const http = require('http');          // Required to attach socket.io
const { Server } = require('socket.io'); // Correct import

// Step 2: Initialize Express app
const app = express();

// Step 3: Create HTTP server (required for socket.io)
const server = http.createServer(app);

// Step 4: Setup socket.io server with CORS
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Middleware: Parse JSON
app.use(express.json());

// Serve static files
app.use(express.static('public'));

// Basic route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Step 5: Socket.io connection event listener
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('message', (data) => {
        io.emit('message', data); // Broadcast to every client
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);

});
