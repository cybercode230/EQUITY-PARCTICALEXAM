const ProductService = require("./product.service");

const ProductController = {
  addProduct: async (req, res) => {
    try {
      const product = await ProductService.addProduct(req.body, req.user);
      res.status(201).json({ success: true, product });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const product = await ProductService.updateProduct(req.params.id, req.body, req.user);
      res.json({ success: true, product });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const product = await ProductService.deleteProduct(req.params.id, req.user);
      res.json({ success: true, product });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const products = await ProductService.getAllProducts();
      res.json({ success: true, products });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  getProductById: async (req, res) => {
    try {
      const product = await ProductService.getProductById(req.params.id);
      res.json({ success: true, product });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
};

module.exports = ProductController;
