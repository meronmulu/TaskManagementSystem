const express = require("express");
const { createProject, getAllProjects, getSingleProject, updateProject,deleteProject } = require("./project.controller");
const { authenticateUser, authorizeRoles } = require("../../midleware/auth.midleware");
const router = express.Router();


router.post("/create-project", authenticateUser, authorizeRoles("ADMIN", "MANAGER"), createProject);
router.get("/projects", authenticateUser, authorizeRoles("ADMIN", "MANAGER","EMPLOYEE"), getAllProjects);
router.get("/project/:id", authenticateUser, authorizeRoles("ADMIN", "MANAGER"), getSingleProject);
router.put("/update-project/:id", authenticateUser, authorizeRoles("ADMIN"), updateProject);
router.delete("/delete-project/:id", authenticateUser, authorizeRoles("ADMIN"), deleteProject);





module.exports = router;
