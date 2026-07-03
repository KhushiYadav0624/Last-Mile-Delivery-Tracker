const mongoose = require("mongoose");

const rateCardSchema = new mongoose.Schema(
  {
    pickupZone: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Zone",
      required: true,
    },

    dropZone: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Zone",
      required: true,
    },

    orderType: {
      type: String,
      enum: ["B2B", "B2C"],
      required: true,
    },

    ratePerKg: {
      type: Number,
      required: true,
    },

    codCharge: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RateCard", rateCardSchema);