const express = require("express");
const cashbackController = require("../controllers/cashbackController");

const router = express.Router();

// Cashback endpoints
router.get("/", cashbackController.getCashbackData);
router.post("/redeem", cashbackController.redeemRewards);
router.get("/transactions", cashbackController.getTransactionHistory);

module.exports = router;
