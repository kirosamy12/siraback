const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["sales", "operations", "admin"],
      default: "sales",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", authSchema);
