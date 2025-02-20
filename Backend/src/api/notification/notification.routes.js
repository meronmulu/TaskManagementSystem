
const express = require("express");
const { getUserNotifications, markNotificationAsRead, deleteNotification } = require("./notification.controller");
const { authenticateUser } = require("../../midleware/auth.midleware");

const router = express.Router();

router.get("/notifications/:userId", getUserNotifications);
router.put("/:id/read", markNotificationAsRead);
router.delete("delete/:id",authenticateUser, deleteNotification);

module.exports = router;


