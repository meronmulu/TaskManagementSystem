const express = require("express");
const router= express.Router();
const  { createProject, getAllProjects, getSingleProject, updateProject, deleteProject }= require("./project.controller");
const { authenticateUser, authorizeRoles } = require("../../midleware/auth.midleware")



router.post("/create-project",authenticateUser, authorizeRoles("ADMIN", "MANAGER"), createProject);
router.get("/projects",authenticateUser, getAllProjects);
router.get("/project/:id",authenticateUser, getSingleProject);
router.put("/update-project/:id",authenticateUser,authorizeRoles("ADMIN", "MANAGER"), updateProject);
router.delete("/delete-project/:id",authenticateUser,authorizeRoles("ADMIN", "MANAGER"), deleteProject);

module.exports = router ;