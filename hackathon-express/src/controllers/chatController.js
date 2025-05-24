const supabase = require("../services/supabase");

const chatController = {
  async sendMessage(req, res, next) {
    try {
      const { message } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      // TODO: Implement AI chat logic here
      const response = {
        message: `Echo: ${message}`,
        timestamp: new Date().toISOString(),
        id: Date.now(),
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  },

  async getChatHistory(req, res, next) {
    try {
      // TODO: Implement chat history from database
      const history = [
        {
          id: 1,
          message: "Hello! How can I help you?",
          sender: "bot",
          timestamp: new Date().toISOString(),
        },
      ];

      res.json(history);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = chatController;
