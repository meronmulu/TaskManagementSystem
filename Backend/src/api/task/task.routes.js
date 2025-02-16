const express = require("express");
const { authenticateUser , authorizeRoles } = require("../../midleware/auth.midleware");
const {
    createTask,
    assignUserToTask,
    getAllTasks,
    getSingleTask,
    updateTask,
    deleteTask,
} = require("../task/task.controller");

const router = express.Router();


router.post("/create-tasks", authenticateUser , authorizeRoles("ADMIN", "MANAGER"), createTask); 
router.post("/assign-user",authenticateUser , authorizeRoles("ADMIN", "MANAGER"), assignUserToTask);
router.get("/tasks", authenticateUser , getAllTasks); // All authenticated users can view tasks
router.get("/task/:id", authenticateUser , getSingleTask); // All authenticated users can view a single task
router.put("/update-tasks/:id", authenticateUser , authorizeRoles("ADMIN", "MANAGER"), updateTask); // ADMIN and MANAGER can update tasks
router.delete("/delete-tasks/:id", authenticateUser , authorizeRoles("ADMIN"), deleteTask); // Only ADMIN can delete tasks

module.exports = router;