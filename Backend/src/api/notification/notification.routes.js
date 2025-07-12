
const express = require("express");
const { getUserNotifications, markNotificationAsRead, deleteNotification,notifyTaskCompletion,notifyIssueCreated } = require("./notification.controller");
const { authenticateUser } = require("../../midleware/auth.midleware");

const router = express.Router();

router.get("/:userId", getUserNotifications);
router.put("/:id/read", markNotificationAsRead);
router.delete("/delete/:id",authenticateUser, deleteNotification);
router.post("/task-completed/:taskId", (req, res) => {
  notifyTaskCompletion(Number(req.params.taskId), req)
    .then(() => res.json({ success: true, message: "Task completion notifications sent" }))
    .catch((err) => res.status(500).json({ success: false, message: err.message }));
});

// Trigger notifications on issue creation (e.g., call after issue created)
router.post("/issue-created/:issueId", (req, res) => {
  notifyIssueCreated(Number(req.params.issueId), req)
    .then(() => res.json({ success: true, message: "Issue creation notifications sent" }))
    .catch((err) => res.status(500).json({ success: false, message: err.message }));
});

module.exports = router;


