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
const server = createServer(app); 
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(express.json()); 

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

app.use("/api/users", useRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes); 
app.use("/api/issues", issuesRoutes);
app.use("/api/notifications", notificationRoutes);

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
