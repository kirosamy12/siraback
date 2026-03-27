const express = require("express");
const router = express.Router();
const { createEntry, getEntries, getEntryById, getMyEntries } = require("./sales.controller");
const { createEntryValidation } = require("./sales.validation");
const { protect, authorize } = require("../../middlewares/auth.middleware");

// must be before /:id to avoid conflict
router.get("/my", protect, authorize("sales", "admin"), getMyEntries);

router.post("/", protect, authorize("sales", "admin"), createEntryValidation, createEntry);
router.get("/", protect, authorize("sales", "admin"), getEntries);
router.get("/:id", protect, authorize("sales", "admin"), getEntryById);

module.exports = router;
