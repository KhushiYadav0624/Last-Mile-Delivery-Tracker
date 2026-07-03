const express = require("express");

const {
  createAgent,
  getAgents,
  updateAvailability,
  getDashboardStats,
} = require("../controllers/agentController");

const router = express.Router();

router.post("/", createAgent);

router.get("/dashboard", getDashboardStats);

router.get("/", getAgents);

router.put("/:id", updateAvailability);

module.exports = router;