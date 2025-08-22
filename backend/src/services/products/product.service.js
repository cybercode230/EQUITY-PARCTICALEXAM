const Product = require("./product.model");
const QueueService = require("../queue/queue.service");
const redis = require("../../config/redis");

const ProductService = {
  async addProduct(data, user) {
    const [productId] = await Product.create(data);
    await QueueService.addNotification(`Product added by ${user.username}: ${data.name}`);
    await redis.del(`product:${productId}`); // clear cache
    return { id: productId, ...data };
  },

  async updateProduct(id, data, user) {
    await Product.update(id, data);
    await QueueService.addNotification(`Product updated by ${user.username}: ID ${id}`);
    await redis.set(`product:${id}`, JSON.stringify({ id, ...data }));
    return { id, ...data };
  },

  async deleteProduct(id, user) {
    await Product.delete(id);
    await QueueService.addNotification(`Product deleted by ${user.username}: ID ${id}`);
    await redis.del(`product:${id}`);
    return { id };
  },

  async getAllProducts() {
    return Product.findAll();
  },

  async getProductById(id) {
    const cachedProduct = await redis.get(`product:${id}`);
    if (cachedProduct) {
      console.log("✅ Product retrieved from Redis cache");
      return JSON.parse(cachedProduct);
    }

    const product = await Product.findById(id);
    if (!product) throw new Error("Product not found");

    await redis.set(`product:${id}`, JSON.stringify(product), "EX", 3600);
    console.log("✅ Product stored in Redis cache");
    return product;
  }
};

module.exports = ProductService;
