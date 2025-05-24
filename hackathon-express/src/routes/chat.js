const express = require("express");
const chatController = require("../controllers/chatController");

const router = express.Router();

// Chat endpoints
router.post("/", chatController.sendMessage);
router.get("/history", chatController.getChatHistory);

module.exports = router;
