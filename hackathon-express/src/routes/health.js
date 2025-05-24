const express = require("express");
const router = express.Router();

// Health check endpoint
router.get("/", async (req, res, next) => {
  try {
    // Simple health check without database dependency for now
    // You can add database checks later when you have tables set up
    res.json({
      status: "online", // This matches what ConnectionStatus.jsx expects
      server: "running",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
