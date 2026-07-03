const express = require("express");

const router = express.Router();

const {
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
} = require("../controllers/orderController");

router.post("/", createOrder);

router.put("/assign", assignAgent);

router.put("/auto-assign", autoAssignAgent);

router.put("/status", updateOrderStatus);

router.put("/reschedule", rescheduleOrder);

router.get("/", getAllOrders);

router.get("/filter", filterOrders);
router.get("/dashboard/stats", getDashboardStats);
router.get("/tracking/:orderId", getTrackingHistory);
router.get("/:orderId", getOrderDetails);
module.exports = router;