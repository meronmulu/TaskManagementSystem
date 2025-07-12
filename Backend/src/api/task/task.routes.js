const express = require("express");
const { createTask, getAllTasks, getSingleTask, updateTask, deleteTask,assignTask,getTasksByProject,getTasksByUser} = require("./task.controller");
const { authenticateUser, authorizeRoles } = require("../../midleware/auth.midleware");
const router = express.Router();


router.post("/create-task", authenticateUser, authorizeRoles("ADMIN", "MANAGER"), createTask);
router.put("/assign-task/:id", authenticateUser, authorizeRoles("ADMIN","MANAGER"), assignTask);
router.get("/tasks", authenticateUser, authorizeRoles("ADMIN", "MANAGER","EMPLOYEE"), getAllTasks);
router.get("/task/:id", authenticateUser, authorizeRoles("ADMIN", "MANAGER","EMPLOYEE"), getSingleTask);
router.put("/update-task/:id", authenticateUser, authorizeRoles("ADMIN","EMPLOYEE"), updateTask);
router.delete("/delete-task/:id", authenticateUser, authorizeRoles("ADMIN"), deleteTask);
router.get("/project/:projectId", authenticateUser, authorizeRoles("ADMIN", "MANAGER","EMPLOYEE"), getTasksByProject);
router.get("/by-user/:userId", authenticateUser, authorizeRoles("ADMIN", "MANAGER","EMPLOYEE"), getTasksByUser);





module.exports = router;