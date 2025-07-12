const express = require("express");
const router = express.Router();
const { getManagerDashboardSummary } = require("../dashboard/dashboard.controller");

router.get("/manager-summary", getManagerDashboardSummary);

module.exports = router;
