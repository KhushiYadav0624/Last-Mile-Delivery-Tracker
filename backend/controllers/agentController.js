
const User = require("../models/User");
const Order = require("../models/Order");
// Create Delivery Agent
const createAgent = async (req, res) => {
  try {
    const agent = await User.create({
      ...req.body,
      role: "agent",
    });

    res.status(201).json({
      message: "Agent Created Successfully",
      agent,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Agents
const getAgents = async (req, res) => {
  try {
    const agents = await User.find({
      role: "agent",
    });

    res.status(200).json(agents);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Availability
const updateAvailability = async (req, res) => {
  try {
    const agent = await User.findByIdAndUpdate(
      req.params.id,
      {
        available: req.body.available,
      },
      { new: true }
    );

    res.status(200).json(agent);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Agent Dashboard Stats
const getDashboardStats = async (req, res) => {
  try {
    const pendingOrders = await Order.countDocuments({
      status: "Pending",
    });

    const deliveredOrders = await Order.countDocuments({
      status: "Delivered",
    });

    const failedOrders = await Order.countDocuments({
      status: "Failed",
    });

    const assignedOrders = await Order.countDocuments({
      assignedAgent: { $ne: null },
    });

    res.status(200).json({
      pendingOrders,
      deliveredOrders,
      failedOrders,
      assignedOrders,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createAgent,
  getAgents,
  updateAvailability,
  getDashboardStats,
};