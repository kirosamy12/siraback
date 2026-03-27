const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const authRoutes = require("./modules/auth/auth.routes");
const salesRoutes = require("./modules/sales/sales.routes");
const operationsRoutes = require("./modules/operations/operations.routes");
const { errorHandler, notFound } = require("./middlewares/error.middleware");

const app = express();

// ── Security & Parsing ──────────────────────────────────────────
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
 
// ── Logging ─────────────────────────────────────────────────────
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

// ── Health check ────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "SIRA API is running" });
});

// ── Routes ──────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/operations", operationsRoutes);

// ── Error Handling ──────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

module.exports = app;
