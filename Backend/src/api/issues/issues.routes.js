const express = require("express");
const { createIssue, getAllIssues, getSingleIssue, updateissue,deleteissue } = require("./issues.controller");
const { authenticateUser } = require("../../midleware/auth.midleware");
const router = express.Router();


router.post("/create-issue", authenticateUser, createIssue);
router.get("/issues", authenticateUser, getAllIssues);
router.get("/issue/:id", authenticateUser, getSingleIssue);
router.put("/update-issue/:id", authenticateUser, updateissue);
router.delete("/delete-issue/:id", authenticateUser, deleteissue);





module.exports = router;
