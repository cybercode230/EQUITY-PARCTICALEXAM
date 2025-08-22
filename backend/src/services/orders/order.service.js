const { Order, OrderItem } = require("./order.model");
const Product = require("../products/product.model");
const QueueService = require("../queue/queue.service");
const redis = require("../../config/redis");

const OrderService = {
  // Customer places order
  async placeOrder(customer_id, items) {
    let totalAmount = 0;

    // Validate products and calculate total
    for (const item of items) {
      const product = await Product.findById(item.product_id);
      if (!product) throw new Error(`Product ID ${item.product_id} not found`);
      if (product.stock < item.quantity) throw new Error(`Not enough stock for ${product.name}`);
      totalAmount += product.price * item.quantity;
    }

    // Create order
    const [orderId] = await Order.createOrder({
      customer_id,
      total_amount: totalAmount
    });

    // Create order items and reduce stock
    for (const item of items) {
      const product = await Product.findById(item.product_id);
      await OrderItem.createItem({
        order_id: orderId,
        product_id: item.product_id,
        quantity: item.quantity,
        price: product.price
      });
      await Product.update(item.product_id, { stock: product.stock - item.quantity });
    }

    await QueueService.addNotification(`New order placed by customer ${customer_id}: Order ID ${orderId}`);

    // Cache order
    const orderDetails = await OrderService.getOrderById(orderId);
    await redis.set(`order:${orderId}`, JSON.stringify(orderDetails), "EX", 3600);

    return orderDetails;
  },

  async getOrderById(id) {
    const cached = await redis.get(`order:${id}`);
    if (cached) return JSON.parse(cached);

    const order = await Order.findById(id);
    if (!order) throw new Error("Order not found");

    const items = await OrderItem.findByOrder(id);
    order.items = items;

    await redis.set(`order:${id}`, JSON.stringify(order), "EX", 3600);
    return order;
  },

  async getOrdersByCustomer(customer_id) {
    return Order.findByCustomer(customer_id);
  },

  async getAllOrders() {
    return Order.findAll();
  },

  async updateOrderStatus(order_id, status, user) {
    await Order.updateOrder(order_id, { status });
    await QueueService.addNotification(`Order ID ${order_id} status updated by ${user.username} to ${status}`);

    const updatedOrder = await OrderService.getOrderById(order_id);
    await redis.set(`order:${order_id}`, JSON.stringify(updatedOrder), "EX", 3600);

    return updatedOrder;
  }
};

module.exports = OrderService;
