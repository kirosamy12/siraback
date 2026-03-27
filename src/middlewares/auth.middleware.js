const jwt = require("jsonwebtoken");
const { HTTP_STATUS } = require("../utils/constants");

const protect = (req, res, next) => {
  const header = req.headers.authorization;
  // SSE passes token as query param since EventSource doesn't support headers
  const queryToken = req.query.token;
  const raw = header?.startsWith("Bearer ") ? header.split(" ")[1] : queryToken;

  if (!raw) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ success: false, message: "No token provided" });
  }
  try {
    req.user = jwt.verify(raw, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({ success: false, message: "Invalid token" });
  }
};

const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user?.role)) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({ success: false, message: "Access denied" });
  }
  next();
};

module.exports = { protect, authorize };
