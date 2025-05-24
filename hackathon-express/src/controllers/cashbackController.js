const supabase = require("../services/supabase");

const cashbackController = {
  async getCashbackData(req, res, next) {
    try {
      // TODO: Fetch real cashback data from database
      const cashbackData = {
        totalEarned: 125.5,
        availableBalance: 87.25,
        pendingRewards: 38.25,
        lastUpdated: new Date().toISOString(),
      };

      res.json(cashbackData);
    } catch (error) {
      next(error);
    }
  },

  async redeemRewards(req, res, next) {
    try {
      const { amount } = req.body;

      if (!amount || amount <= 0) {
        return res.status(400).json({ error: "Valid amount is required" });
      }

      // TODO: Implement redemption logic
      res.json({
        success: true,
        message: `Successfully redeemed $${amount}`,
        transactionId: Date.now(),
      });
    } catch (error) {
      next(error);
    }
  },

  async getTransactionHistory(req, res, next) {
    try {
      // TODO: Fetch real transaction history
      const transactions = [
        {
          id: 1,
          type: "cashback",
          amount: 5.25,
          description: "Purchase at Coffee Shop",
          date: new Date().toISOString(),
        },
      ];

      res.json(transactions);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = cashbackController;
