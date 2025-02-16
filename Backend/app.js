const express = require("express");
require("dotenv").config(); 
const { createServer } = require("http");
const { Server } = require("socket.io");

const port = process.env.PORT; 

const useRoutes = require("./src/api/user/user.routes");
const projectRoutes = require("./src/api/project/project.routes");
const taskRoutes = require("./src/api/task/task.routes");
const issuesRoutes = require("./src/api/issues/issues.routes");
const notificationRoutes = require("./src/api/notification/notification.routes");

const app = express();
const server = createServer(app); // Create an HTTP server
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(express.json()); 

// Store io instance globally so controllers can use it
app.set("io", io);

// WebSockets connection
io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);
    
    socket.on("join", (userId) => {
        socket.join(userId);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id);
    });
});

// Correct API Routes
app.use("/api/users", useRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes); // FIXED TYPO (taskss → tasks)
app.use("/api/issues", issuesRoutes);
app.use("/api/notifications", notificationRoutes);

// FIX: Use `server.listen()` instead of `app.listen()`
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
