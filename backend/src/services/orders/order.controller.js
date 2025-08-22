const OrderService = require("./order.service");

const OrderController = {
  // Customer places order
  placeOrder: async (req, res) => {
    try {
      const order = await OrderService.placeOrder(req.user.id, req.body.items);
      res.status(201).json({ success: true, order });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  getOrderById: async (req, res) => {
    try {
      const order = await OrderService.getOrderById(req.params.id);
      res.json({ success: true, order });
    } catch (err) {
      res.status(404).json({ success: false, message: err.message });
    }
  },

  getMyOrders: async (req, res) => {
    try {
      const orders = await OrderService.getOrdersByCustomer(req.user.id);
      res.json({ success: true, orders });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  getAllOrders: async (req, res) => {
    try {
      const orders = await OrderService.getAllOrders();
      res.json({ success: true, orders });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  updateOrderStatus: async (req, res) => {
    try {
      const order = await OrderService.updateOrderStatus(req.params.id, req.body.status, req.user);
      res.json({ success: true, order });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
};

module.exports = OrderController;
