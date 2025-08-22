const express = require("express");
const ProductController = require("./product.controller");
const { authMiddleware, roleMiddleware } = require("../auth/auth.middleware");

const router = express.Router();

// Public routes (all users)
router.get("/", authMiddleware, ProductController.getAllProducts);
router.get("/:id", authMiddleware, ProductController.getProductById);

// Admin-only routes
router.post("/", authMiddleware, roleMiddleware(["admin"]), ProductController.addProduct);
router.put("/:id", authMiddleware, roleMiddleware(["admin"]), ProductController.updateProduct);
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), ProductController.deleteProduct);

module.exports = router;
