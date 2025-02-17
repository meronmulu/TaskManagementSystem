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
router.get("/tasks", authenticateUser , getAllTasks); 
router.get("/task/:id", authenticateUser , getSingleTask); 
router.put("/update-tasks/:id", authenticateUser , authorizeRoles("ADMIN", "MANAGER"), updateTask); 
router.delete("/delete-tasks/:id", authenticateUser , authorizeRoles("ADMIN"), deleteTask); 

module.exports = router;