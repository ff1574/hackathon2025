const supabase = require("../services/supabase");

const authController = {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
      }

      // TODO: Implement real authentication
      const user = {
        id: 1,
        email: email,
        name: "Demo User",
        token: "demo-token-" + Date.now(),
      };

      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  async logout(req, res, next) {
    try {
      // TODO: Implement logout logic
      res.json({ message: "Successfully logged out" });
    } catch (error) {
      next(error);
    }
  },

  async getCurrentUser(req, res, next) {
    try {
      // TODO: Implement get current user logic
      const user = {
        id: 1,
        email: "demo@example.com",
        name: "Demo User",
      };

      res.json(user);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;
