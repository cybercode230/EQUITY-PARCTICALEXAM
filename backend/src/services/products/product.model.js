const db = require("../../config/db");

const Product = {
  async create(data) {
    return db("products").insert(data);
  },

  async update(id, data) {
    return db("products").where({ id }).update(data);
  },

  async delete(id) {
    return db("products").where({ id }).del();
  },

  async findAll() {
    return db("products").select("*");
  },

  async findById(id) {
    return db("products").where({ id }).first();
  }
};

module.exports = Product;
