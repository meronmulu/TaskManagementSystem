const express = require("express");
const cors = require("cors");
const http = require("http");

// Import your custom socket setup function (adjust path if needed)
const setupSocket = require("./src/Socket");

const userRoutes = require("./src/api/user/user.routes");
const projectRoutes = require("./src/api/project/project.routes");
const taskRoutes = require("./src/api/task/task.routes");
const notificationRoutes = require("./src/api/notification/notification.routes");
const issuesRoutes = require("./src/api/issues/issues.routes");
const dashboardRoutes = require("./src/api/dashboard/dashboard.routes");

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 6600;

app.use(
  cors({
    origin: "http://localhost:3000", 
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
app.use("/api/dashboard", dashboardRoutes);

// Initialize Socket.IO using your setupSocket function
const io = setupSocket(server);
app.set("io", io);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = { app, io };
