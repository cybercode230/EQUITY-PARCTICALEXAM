const db = require("../../config/db");

const Users = {
  async create(user) {
    return db("users").insert(user);
  },

  async findByEmail(email) {
    return db("users").where({ email }).first();
  },

  async findById(id) {
    return db("users").where({ id }).first();
  }
};

module.exports = Users;
