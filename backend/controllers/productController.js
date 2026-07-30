const Product = require('../models/Product');

// Sample initial products for seeding MongoDB if database collection is empty
const INITIAL_SEED_PRODUCTS = [
  {
    title: "JAC-3D-3028 3D Wall Panel CNC Relief Model File",
    designCode: "JAC-3D-3028",
    category: "3D Design",
    price: 480,
    originalPrice: 500,
    discountPercent: 4,
    fileFormats: ["RLF", "STL"],
    software: ["Artcam 2008-2018", "3ds Max", "JDPaint", "AutoCAD", "Aspire"],
    images: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
      "https://images.unsplash.com/photo-1615873968403-89e068629265?w=600&q=80"
    ],
    size: "8x4 Size (Adjustable)",
    description: `<p><strong>Get design files on WhatsApp immediately after purchase.</strong></p>
<ul>
  <li><strong>Files:</strong> RLF File (Artcam Relief File For All Versions of Artcam)</li>
  <li><strong>Files:</strong> STL File (3Ds Max, JDPaint, AutoCAD, Maya, Aspire)</li>
  <li><strong>Size:</strong> Adjustable (8x4 Ft)</li>
  <li><strong>Delivery Time:</strong> Instant delivery on WhatsApp</li>
</ul>
<p><em>If any error in files, please request on WhatsApp Helpline. We will provide updated files within 24 hours.</em></p>`,
    isDigital: true,
    inStock: true,
    featured: true
  },
  {
    title: "JAC-3D-3027 High Relief Wave Wall Panel CNC Model",
    designCode: "JAC-3D-3027",
    category: "3D Design",
    price: 480,
    originalPrice: 500,
    discountPercent: 4,
    fileFormats: ["RLF", "STL"],
    software: ["Artcam", "JDPaint", "3ds Max"],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80"
    ],
    size: "8x4 Size (Adjustable)",
    description: `<p>High relief wave and geometrical pattern 3D CNC Model file for Artcam & STL suitable for MDF and Teak Wood CNC Router carving.</p>
<p><strong>Files:</strong> RLF & STL File Formats</p>`,
    isDigital: true,
    inStock: true,
    featured: true
  },
  {
    title: "JAC-2D-1002 Modern Vector Jali Grill CNC Cut File",
    designCode: "JAC-2D-1002",
    category: "2D Design",
    price: 350,
    originalPrice: 400,
    discountPercent: 12,
    fileFormats: ["DXF", "DWG", "EPS", "CDR"],
    software: ["AutoCAD", "CorelDRAW", "Artcam", "LaserCut"],
    images: [
      "https://images.unsplash.com/photo-1615873968403-89e068629265?w=600&q=80"
    ],
    size: "8x4 Feet Vector DXF",
    description: `<p>2D Vector Jali grill cutting design file in DXF, DWG, and CDR vector formats for Plasma, Laser & CNC Router cutting.</p>`,
    isDigital: true,
    inStock: true,
    featured: true
  },
  {
    title: "JAC-TM-2005 Wooden Mandir Temple Arch 3D Artcam Model",
    designCode: "JAC-TM-2005",
    category: "Temple & Mandir",
    price: 850,
    originalPrice: 990,
    discountPercent: 14,
    fileFormats: ["RLF", "STL"],
    software: ["Artcam", "JDPaint", "Aspire"],
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80"
    ],
    size: "Custom Temple Front Sizing",
    description: `<p>Detailed traditional Wooden Temple Arch & Dome 3D CNC Artcam relief model with intricate peacock and floral carvings.</p>`,
    isDigital: true,
    inStock: true,
    featured: true
  },
  {
    title: "JAC-DR-4012 Solid Wood Main Door 3D Relief Carving File",
    designCode: "JAC-DR-4012",
    category: "Door Design",
    price: 650,
    originalPrice: 750,
    discountPercent: 13,
    fileFormats: ["RLF", "STL"],
    software: ["Artcam", "3ds Max", "JDPaint"],
    images: [
      "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=600&q=80"
    ],
    size: "7x3 Feet Door Sizing",
    description: `<p>Intricate solid teak wood main door 3D relief model with elephant/peacock motif details for 3D wood CNC carving.</p>`,
    isDigital: true,
    inStock: true,
    featured: true
  }
];

// @desc    Get all products from MongoDB
// @route   GET /api/products
exports.getProducts = async (req, res) => {
  try {
    let products = await Product.find().sort({ createdAt: -1 });
    
    // Seed initial products into MongoDB if database is empty
    if (products.length === 0) {
      await Product.insertMany(INITIAL_SEED_PRODUCTS);
      products = await Product.find().sort({ createdAt: -1 });
    }
    
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
