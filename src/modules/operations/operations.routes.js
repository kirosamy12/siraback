const express = require("express");
const router = express.Router();
const { getDashboard, getEntryDetails, streamNotifications } = require("./operations.controller");
const { protect, authorize } = require("../../middlewares/auth.middleware");

router.get("/stream", protect, authorize("operations", "admin"), streamNotifications);
router.get("/dashboard", protect, authorize("operations", "admin"), getDashboard);
router.get("/entry/:id", protect, authorize("operations", "admin"), getEntryDetails);

module.exports = router;
