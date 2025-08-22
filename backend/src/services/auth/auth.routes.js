const express = require("express");
const AuthController = require("./auth.controller");
const { authMiddleware, roleMiddleware } = require("./auth.middleware");

const router = express.Router();

// -------------------------
// Public Routes
// -------------------------

// User registration with role selection
router.post("/register", AuthController.register);

// Login
router.post("/login", AuthController.login);

// -------------------------
// Protected Routes Example
// -------------------------

// Admin-only route example
router.get(
  "/admin-only",
  authMiddleware,             // verify JWT + session
  roleMiddleware(["admin"]),   // restrict access to admin role
  (req, res) => {
    res.json({ message: `Welcome Admin ${req.user.id} (${req.user.role})!` });
  }
);

// Manager or Admin route example
router.get(
  "/manager-admin",
  authMiddleware,
  roleMiddleware(["manager", "admin"]),
  (req, res) => {
    res.json({ message: `Hello ${req.user.role} ${req.user.id}, you have access!` });
  }
);

// Customer-only route example
router.get(
  "/customer-only",
  authMiddleware,
  roleMiddleware(["customer"]),
  (req, res) => {
    res.json({ message: `Hello ${req.user.role} ${req.user.id}, this is your route.` });
  }
);

module.exports = router;
