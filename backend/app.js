const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const zoneRoutes = require("./routes/zoneRoutes");
const rateCardRoutes = require("./routes/rateCardRoutes");
const orderRoutes = require("./routes/orderRoutes");
const agentRoutes = require("./routes/agentRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Last Mile Delivery Tracker API Running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/zones", zoneRoutes);
app.use("/api/ratecards", rateCardRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/agents", agentRoutes);
app.get("/api/test", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Protected Route Accessed Successfully",
    user: req.user,
  });
});

module.exports = app;