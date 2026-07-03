const Zone = require("../models/Zone");

// Create Zone
const createZone = async (req, res) => {
  try {
    const zone = await Zone.create(req.body);

    res.status(201).json({
      message: "Zone Created Successfully",
      zone,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Zones
const getZones = async (req, res) => {
  try {
    const zones = await Zone.find();

    res.status(200).json(zones);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createZone,
  getZones,
};