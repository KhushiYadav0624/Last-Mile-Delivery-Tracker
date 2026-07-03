const TrackingHistory = require("../models/TrackingHistory");
const Order = require("../models/Order");
const Zone = require("../models/Zone");
const RateCard = require("../models/RateCard");
const User = require("../models/User");
const createOrder = async (req, res) => {
  try {
    const {
      customer,
      pickupAddress,
      dropAddress,
      pickupCity,
      dropCity,
      length,
      width,
      height,
      actualWeight,
      orderType,
      paymentType,
    } = req.body;

    // Find Pickup Zone
    const pickupZone = await Zone.findOne({
      areas: { $in: [pickupCity] },
    });

    // Find Drop Zone
    const dropZone = await Zone.findOne({
      areas: { $in: [dropCity] },
    });

    if (!pickupZone || !dropZone) {
      return res.status(404).json({
        message: "Zone not found",
      });
    }

    // Calculate Volumetric Weight
    const volumetricWeight = (length * width * height) / 5000;

    // Chargeable Weight
    const chargeableWeight = Math.max(
      actualWeight,
      volumetricWeight
    );

    // Find Rate Card
    const rateCard = await RateCard.findOne({
      pickupZone: pickupZone._id,
      dropZone: dropZone._id,
      orderType,
    });

    if (!rateCard) {
      return res.status(404).json({
        message: "Rate Card not found",
      });
    }

    // Calculate Delivery Charge
    let deliveryCharge = chargeableWeight * rateCard.ratePerKg;

    if (paymentType === "COD") {
      deliveryCharge += rateCard.codCharge;
    }

    // Save Order
    const order = await Order.create({
      customer,
      pickupAddress,
      dropAddress,
      pickupZone: pickupZone._id,
      dropZone: dropZone._id,

      package: {
        length,
        width,
        height,
        actualWeight,
        volumetricWeight,
        chargeableWeight,
      },

      orderType,
      paymentType,
      deliveryCharge,
    });

    res.status(201).json({
      message: "Order Created Successfully",
      order,
    });

  } catch (error) {
  console.error(error);

  res.status(500).json({
    message: error.message,
    stack: error.stack,
  });
}
};
const assignAgent = async (req, res) => {
  try {
    const { orderId, agentId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const agent = await User.findById(agentId);

    if (!agent) {
      return res.status(404).json({
        message: "Agent not found",
      });
    }

    order.assignedAgent = agent._id;

    await order.save();

    res.status(200).json({
      message: "Agent Assigned Successfully",
      order,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const autoAssignAgent = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId).populate("pickupZone");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const agent = await User.findOne({
      role: "agent",
      available: true,
      zone: order.pickupZone.name,
    });

    if (!agent) {
      return res.status(404).json({
        message: "No available agent found",
      });
    }

    order.assignedAgent = agent._id;
    await order.save();

    agent.available = false;
    await agent.save();

    res.status(200).json({
      message: "Agent Auto Assigned Successfully",
      order,
      agent,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status, updatedBy, remarks } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.status = status;
    await order.save();

    await TrackingHistory.create({
      order: order._id,
      status,
      updatedBy,
      remarks,
    });

    // Free the agent after delivery or failed delivery
    if (
      status === "Delivered" ||
      status === "Failed"
    ) {
      if (order.assignedAgent) {
        await User.findByIdAndUpdate(order.assignedAgent, {
          available: true,
        });
      }
    }

    res.status(200).json({
      message: "Order Status Updated",
      order,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId)
      .populate("customer", "name email phone")
      .populate("pickupZone", "name")
      .populate("dropZone", "name")
      .populate("assignedAgent", "name phone zone");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const tracking = await TrackingHistory.find({
      order: orderId,
    }).sort({ createdAt: 1 });

    res.status(200).json({
      order,
      tracking,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const rescheduleOrder = async (req, res) => {
  try {
    const { orderId, rescheduleDate } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (order.status !== "Failed") {
      return res.status(400).json({
        message: "Only failed orders can be rescheduled",
      });
    }

    order.status = "Pending";
    order.rescheduleDate = rescheduleDate;
    order.assignedAgent = null;

    await order.save();

    await TrackingHistory.create({
      order: order._id,
      status: "Rescheduled",
      remarks: "Customer requested reschedule",
    });

    res.status(200).json({
      message: "Order Rescheduled Successfully",
      order,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer", "name email")
      .populate("pickupZone", "name")
      .populate("dropZone", "name")
      .populate("assignedAgent", "name");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const filterOrders = async (req, res) => {
  try {
    const { status, pickupZone, assignedAgent } = req.query;

    let filter = {};

    if (status) filter.status = status;
    if (pickupZone) filter.pickupZone = pickupZone;
    if (assignedAgent) filter.assignedAgent = assignedAgent;

    const orders = await Order.find(filter)
      .populate("customer", "name email")
      .populate("pickupZone", "name")
      .populate("dropZone", "name")
      .populate("assignedAgent", "name");

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    const pendingOrders = await Order.countDocuments({
      status: "Pending",
    });

    const deliveredOrders = await Order.countDocuments({
      status: "Delivered",
    });

    const failedOrders = await Order.countDocuments({
      status: "Failed",
    });

    const availableAgents = await User.countDocuments({
      role: "agent",
      available: true,
    });

    const busyAgents = await User.countDocuments({
      role: "agent",
      available: false,
    });

    res.status(200).json({
      totalOrders,
      pendingOrders,
      deliveredOrders,
      failedOrders,
      availableAgents,
      busyAgents,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getTrackingHistory = async (req, res) => {
  try {
    const history = await TrackingHistory.find({
      order: req.params.orderId,
    })
      .populate("updatedBy", "name")
      .sort({ createdAt: 1 });

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createOrder,
  assignAgent,
  autoAssignAgent,
  updateOrderStatus,
  getOrderDetails,
  rescheduleOrder,
  getAllOrders,
  filterOrders,
  getDashboardStats,
  getTrackingHistory,
};