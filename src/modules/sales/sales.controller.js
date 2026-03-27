const { validationResult } = require("express-validator");
const { HTTP_STATUS } = require("../../utils/constants");
const salesService = require("./sales.service");

// POST /api/sales
const createEntry = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, errors: errors.array() });
    }
    const entry = await salesService.createEntry(req.body, req.user?.id);
    res.status(HTTP_STATUS.CREATED).json({ success: true, data: entry });
  } catch (error) {
    next(error);
  }
};

// GET /api/sales
const getEntries = async (req, res, next) => {
  try {
    const result = await salesService.getEntries(req.query);
    res.status(HTTP_STATUS.OK).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

// GET /api/sales/:id
const getEntryById = async (req, res, next) => {
  try {
    const entry = await salesService.getEntryById(req.params.id);
    res.status(HTTP_STATUS.OK).json({ success: true, data: entry });
  } catch (error) {
    next(error);
  }
};

// GET /api/sales/my
const getMyEntries = async (req, res, next) => {
  try {
    const result = await salesService.getMyEntries(req.user.id, req.query);
    res.status(HTTP_STATUS.OK).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

module.exports = { createEntry, getEntries, getEntryById, getMyEntries };
