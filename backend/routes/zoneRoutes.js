const express = require("express");

const router = express.Router();

const {
  createZone,
  getZones,
} = require("../controllers/zoneController");

router.post("/", createZone);

router.get("/", getZones);

module.exports = router;