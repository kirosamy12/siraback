const express = require("express");
const router = express.Router();
const { register, login, logout } = require("./auth.controller");
const { registerValidation, loginValidation } = require("./auth.validation");
const { protect } = require("../../middlewares/auth.middleware");

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.post("/logout", protect, logout);

module.exports = router;
