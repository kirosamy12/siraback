const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema(
  {
    unitCode: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    ownerPhone: {
      type: String,
      required: true,
      trim: true,
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sales", salesSchema);
