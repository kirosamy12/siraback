const { HTTP_STATUS } = require("../../utils/constants");
const operationsService = require("./operations.service");
const { addClient, removeClient } = require("../../utils/sse");

// GET /api/operations/stream  — SSE
const streamNotifications = (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  // keep-alive ping every 25s
  const ping = setInterval(() => res.write(": ping\n\n"), 25000);
  addClient(res);

  req.on("close", () => {
    clearInterval(ping);
    removeClient(res);
  });
};

// GET /api/operations/dashboard
const getDashboard = async (req, res, next) => {
  try {
    const result = await operationsService.getDashboard(req.query);
    res.status(HTTP_STATUS.OK).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

// GET /api/operations/entry/:id
const getEntryDetails = async (req, res, next) => {
  try {
    const entry = await operationsService.getEntryDetails(req.params.id);
    res.status(HTTP_STATUS.OK).json({ success: true, data: entry });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboard, getEntryDetails, streamNotifications };
