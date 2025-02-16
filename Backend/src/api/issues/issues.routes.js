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


router.post("/create-issues", authenticateUser , createIssue); // ADMIN and MANAGER can create issues
router.get("/issues", authenticateUser , getAllIssues); // All authenticated users can view issues
router.get("/issues/:id", authenticateUser , getSingleIssue); // All authenticated users can view a single issue
router.put("/update-issues/:id", authenticateUser , authorizeRoles("ADMIN", "MANAGER"), updateIssue); // ADMIN and MANAGER can update issues
router.delete("/delete-issues/:id", authenticateUser , authorizeRoles("ADMIN"), deleteIssue); // Only ADMIN can delete issues

module.exports = router;