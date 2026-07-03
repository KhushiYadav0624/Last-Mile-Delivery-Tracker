const RateCard = require("../models/RateCard");

// Create Rate Card
const createRateCard = async (req, res) => {
  try {
    const rateCard = await RateCard.create(req.body);

    res.status(201).json({
      message: "Rate Card Created Successfully",
      rateCard,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Rate Cards
const getRateCards = async (req, res) => {
  try {
    const rateCards = await RateCard.find()
      .populate("pickupZone")
      .populate("dropZone");

    res.status(200).json(rateCards);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createRateCard,
  getRateCards,
};