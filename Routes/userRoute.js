// --- SECTION 1: IMPORTS ---
const express = require("express");
const router = express.Router(); // Create a router object to handle paths
const authController = require("../Controllers/authController"); // Import the logic
const authMiddleware = require("../Middlewares/authMiddleware"); // Import the security guard

// --- SECTION 2: PUBLIC ROUTES ---
// These routes do not need a token. Anyone can access them.

// Route for creating a new account (Register)
// Full URL: http://localhost:5000/api/register
router.post("/register", authController.register);

// Route for logging in (Login)
// Full URL: http://localhost:5000/api/login
router.post("/login", authController.login);

// --- SECTION 3: PROTECTED ROUTES ---
// This route is private. It uses the middleware to check for a token first.

// Route to get the user profile
// Full URL: http://localhost:5000/api/profile
// Note: 'authMiddleware' runs BEFORE the controller logic.
router.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Welcome to your protected profile!",
    user: req.user, // This data comes from the verified token
  });
});

// --- SECTION 4: EXPORT ---
module.exports = router;
