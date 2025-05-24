const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import routes
const healthRoutes = require("./src/routes/health");
const chatRoutes = require("./src/routes/chat");
const cashbackRoutes = require("./src/routes/cashback");
const authRoutes = require("./src/routes/auth");

// Import middleware
const errorHandler = require("./src/middleware/errorHandler");
const logger = require("./src/middleware/logger");

const app = express();
const port = process.env.PORT || 5000;

// Global middleware
app.use(
  cors({
    origin: true, // Allow all origins for development
    credentials: true,
  })
);
app.use(express.json());
app.use(logger);

// Routes
app.use("/api/health", healthRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/cashback", cashbackRoutes);
app.use("/api/auth", authRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "OTP Bank API Server",
    version: "1.0.0",
    endpoints: ["/api/health", "/api/chat", "/api/cashback", "/api/auth"],
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📡 API available at http://localhost:${port}`);
});
