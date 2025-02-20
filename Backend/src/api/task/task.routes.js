const express = require("express");
const { createTask, getAllTasks, getSingleTask, updateTask, deleteTask,assignTask } = require("./task.controller");
const { authenticateUser, authorizeRoles } = require("../../midleware/auth.midleware");
const router = express.Router();


router.post("/create-task", authenticateUser, authorizeRoles("ADMIN", "MANAGER"), createTask);
router.put("/assign-task/:id", authenticateUser, authorizeRoles("ADMIN","MANAGER"), assignTask);
router.get("/tasks", authenticateUser, authorizeRoles("ADMIN", "MANAGER"), getAllTasks);
router.get("/task/:id", authenticateUser, authorizeRoles("ADMIN", "MANAGER"), getSingleTask);
router.put("/update-task/:id", authenticateUser, authorizeRoles("ADMIN"), updateTask);
router.delete("/delete-task/:id", authenticateUser, authorizeRoles("ADMIN"), deleteTask);



module.exports = router;