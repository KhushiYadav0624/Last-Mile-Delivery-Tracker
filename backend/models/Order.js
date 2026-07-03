const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    pickupAddress: {
      type: String,
      required: true,
      trim: true,
    },

    dropAddress: {
      type: String,
      required: true,
      trim: true,
    },

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

    package: {
      length: {
        type: Number,
        required: true,
      },
      width: {
        type: Number,
        required: true,
      },
      height: {
        type: Number,
        required: true,
      },
      actualWeight: {
        type: Number,
        required: true,
      },
      volumetricWeight: Number,
      chargeableWeight: Number,
    },

    orderType: {
      type: String,
      enum: ["B2B", "B2C"],
      required: true,
    },

    paymentType: {
      type: String,
      enum: ["Prepaid", "COD"],
      required: true,
    },

    deliveryCharge: {
      type: Number,
      default: 0,
    },

    assignedAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Picked Up",
        "In Transit",
        "Out for Delivery",
        "Delivered",
        "Failed",
      ],
      default: "Pending",
    },
    rescheduleDate: {
  type: Date,
  default: null,
},

failureReason: {
  type: String,
  default: "",
},
assignedAgent: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  default: null,
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);