const { validationResult } = require("express-validator");
const { HTTP_STATUS } = require("../../utils/constants");
const authService = require("./auth.service");

// POST /api/auth/register
const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, errors: errors.array() });
    }
    const result = await authService.register(req.body);
    res.status(HTTP_STATUS.CREATED).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, errors: errors.array() });
    }
    const result = await authService.login(req.body.email, req.body.password);
    res.status(HTTP_STATUS.OK).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/logout
const logout = async (req, res, next) => {
  try {
    res.status(HTTP_STATUS.OK).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, logout };
