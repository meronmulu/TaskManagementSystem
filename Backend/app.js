const express = require("express");
require("dotenv").config();
const cors = require("cors");
const http = require("http");
const setupSocket = require("socket.io");

const userRoutes = require("./src/api/user/user.routes");
const projectRoutes = require("./src/api/project/project.routes");
const taskRoutes = require("./src/api/task/task.routes");
const notificationRoutes = require("./src/api/notification/notification.routes");
const issuesRoutes = require("./src/api/issues/issues.routes")

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 6600;

app.use(
    cors({
        origin: "http://localhost:3001",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/issues", issuesRoutes);



const io = setupSocket(server);
app.set("io", io);

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = { app, io };
