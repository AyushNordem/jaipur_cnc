const Product = require('../models/Product');

// @desc    Get all products from MongoDB
// @route   GET /api/products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products from MongoDB', error: error.message });
  }
};

// @desc    Get single product by ID or designCode
// @route   GET /api/products/:id
exports.getProductById = async (req, res) => {
  try {
    let product;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(req.params.id);
    }
    
    // Search by designCode if not valid ObjectId or not found by Mongo ID
    if (!product) {
      product = await Product.findOne({ designCode: req.params.id });
    }

    if (!product) {
      return res.status(404).json({ message: 'Product not found in MongoDB' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product from MongoDB', error: error.message });
  }
};

// @desc    Create a new product in MongoDB
// @route   POST /api/products
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create product in MongoDB', error: error.message });
  }
};

// @desc    Update a product in MongoDB
// @route   PUT /api/products/:id
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update product in MongoDB', error: error.message });
  }
};

// @desc    Delete a product from MongoDB
// @route   DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully from MongoDB' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product from MongoDB', error: error.message });
  }
};
