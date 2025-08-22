const express = require("express");
const OrderController = require("./order.controller");
const { authMiddleware, roleMiddleware } = require("../auth/auth.middleware");

const router = express.Router();

// Customer routes
router.post("/", authMiddleware, roleMiddleware(["customer"]), OrderController.placeOrder);
router.get("/my-orders", authMiddleware, roleMiddleware(["customer"]), OrderController.getMyOrders);
router.get("/:id", authMiddleware, OrderController.getOrderById); // All users can get specific order (with proper check in frontend)

// Manager/Admin routes
router.get("/", authMiddleware, roleMiddleware(["manager","admin"]), OrderController.getAllOrders);
router.put("/:id/status", authMiddleware, roleMiddleware(["manager","admin"]), OrderController.updateOrderStatus);

module.exports = router;
