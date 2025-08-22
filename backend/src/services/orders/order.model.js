const db = require("../../config/db");

const Order = {
  async createOrder(data) {
    return db("orders").insert(data);
  },

  async updateOrder(id, data) {
    return db("orders").where({ id }).update(data);
  },

  async findById(id) {
    return db("orders").where({ id }).first();
  },

  async findAll() {
    return db("orders").select("*");
  },

  async findByCustomer(customer_id) {
    return db("orders").where({ customer_id }).select("*");
  }
};

const OrderItem = {
  async createItem(data) {
    return db("order_items").insert(data);
  },

  async findByOrder(order_id) {
    return db("order_items").where({ order_id }).select("*");
  }
};

module.exports = { Order, OrderItem };
