const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// Auth endpoints
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/me", authController.getCurrentUser);

module.exports = router;
