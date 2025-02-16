const express = require("express");
const { getAllNotification,markNotificationAsRead } = require("./notification.controller");
const router = express.Router();


router.get("/notifications", getAllNotification);
router.put("/notification", markNotificationAsRead);


module.exports = router ;