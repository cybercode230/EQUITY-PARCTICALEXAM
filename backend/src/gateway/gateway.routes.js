const express = require("express");
const router = express.Router();
const authRouter =require("../services/auth/auth.routes")
const productRouter =require("../services/products/product.routes")
const orderRouter =require("../services/orders/order.routes")

// Example route
router.get("/status", (req, res) => {
  res.json({ message: "Gateway API is working" });
});
router.use("/products",productRouter);
router.use("/orders",orderRouter);

router.use("/auth",authRouter)
module.exports = router;
