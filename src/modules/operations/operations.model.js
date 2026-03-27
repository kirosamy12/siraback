const mongoose = require("mongoose");

const operationsSchema = new mongoose.Schema(
  {
    salesEntry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sales",
      required: true,
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
); 

module.exports = mongoose.model("Operations", operationsSchema);
