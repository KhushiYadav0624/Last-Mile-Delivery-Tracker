const express = require("express");

const router = express.Router();

const {
  createRateCard,
  getRateCards,
} = require("../controllers/rateCardController");

router.post("/", createRateCard);

router.get("/", getRateCards);

module.exports = router;