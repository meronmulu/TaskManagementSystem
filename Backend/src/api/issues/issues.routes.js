const express = require("express");
const { authenticateUser , authorizeRoles } = require("../../midleware/auth.midleware");
const {
    createIssue,
    getAllIssues,
    getSingleIssue,
    updateIssue,
    deleteIssue,
} = require("../issues/issues.controller");

const router = express.Router();


router.post("/create-issues", authenticateUser , createIssue);
router.get("/issues", authenticateUser , getAllIssues);
router.get("/issues/:id", authenticateUser , getSingleIssue); 
router.put("/update-issues/:id", authenticateUser , authorizeRoles("ADMIN", "MANAGER"), updateIssue); 
router.delete("/delete-issues/:id", authenticateUser , authorizeRoles("ADMIN"), deleteIssue); 

module.exports = router;