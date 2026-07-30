const Product = require('../models/Product');

// Sample default products if DB is empty
const SAMPLE_PRODUCTS = [
  {
    title: "3DWP-3028 3D Wall Panel 3D Model 8x4",
    designCode: "3DWP-3028",
    category: "3D Wall Panel",
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
    description: "Instant Download Link Automatically appear after Purchase.\nFiles - RLF File (Artcam Relief File For All Version Of Artcam)\nFiles - STL File\nRLF Files Can Be open in - Artcam 2009, Artcam 2008 Artcam 2007 And Artcam 2018.\nSTL Files Can Be open in - 3Ds Max, JDPaint, AutoCAD, Maya And Other All 3D Modeling Software.\nSize - Adjustable\nDownload Link Time - Instant Download.\nIf Any error in files, Please request on Whatsapp Helpline We will provide Files within 24 Hr.\nThis is a Computer Digital File not any actual product.\nReturn Of order is not Accepted Because product is Copy-able, Please Read all details before purchase.",
    isDigital: true,
    inStock: true,
    featured: true
  },
  {
    title: "3DWP-3027 3D Wall Panel 3D Model 8x4",
    designCode: "3DWP-3027",
    category: "3D Wall Panel",
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
    description: "High relief wave and geometrical pattern 3D CNC Model file for Artcam & STL suitable for MDF and Teak Wood CNC Router carving.",
    isDigital: true,
    inStock: true,
    featured: true
  },
  {
    title: "3DWP-3026 3D Wall Panel 3D Model 8x4",
    designCode: "3DWP-3026",
    category: "3D Wall Panel",
    price: 480,
    originalPrice: 500,
    discountPercent: 4,
    fileFormats: ["RLF", "STL"],
    software: ["Artcam", "JDPaint", "Aspire"],
    images: [
      "https://images.unsplash.com/photo-1615873968403-89e068629265?w=600&q=80"
    ],
    size: "8x4 Size (Adjustable)",
    description: "Modern ornamental lattice 3D wall panel design file in RLF & STL formats for CNC routers.",
    isDigital: true,
    inStock: true,
    featured: true
  },
  {
    title: "3DWP-3024 3D Wall Panel 3D Model 8x4",
    designCode: "3DWP-3024",
    category: "3D Wall Panel",
    price: 480,
    originalPrice: 500,
    discountPercent: 4,
    fileFormats: ["RLF", "STL"],
    software: ["Artcam", "JDPaint"],
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80"
    ],
    size: "8x4 Size (Adjustable)",
    description: "Fine texturing 3D wall relief design file for CNC wood carving.",
    isDigital: true,
    inStock: true,
    featured: false
  },
  {
    title: "3DWP-3023 3D Wall Panel 3D Model 8x4",
    designCode: "3DWP-3023",
    category: "3D Wall Panel",
    price: 480,
    originalPrice: 500,
    discountPercent: 4,
    fileFormats: ["RLF", "STL"],
    software: ["Artcam", "JDPaint", "3ds Max"],
    images: [
      "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=600&q=80"
    ],
    size: "8x4 Size (Adjustable)",
    description: "Traditional floral medallion 3D wall panel relief file for CNC wood router.",
    isDigital: true,
    inStock: true,
    featured: false
  },
  {
    title: "3DWP-3022 3D Wall Panel 3D Model 8x4",
    designCode: "3DWP-3022",
    category: "3D Wall Panel",
    price: 480,
    originalPrice: 500,
    discountPercent: 4,
    fileFormats: ["RLF", "STL"],
    software: ["Artcam", "JDPaint"],
    images: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80"
    ],
    size: "8x4 Size (Adjustable)",
    description: "3D Block mosaic pattern wall panel Artcam relief model.",
    isDigital: true,
    inStock: true,
    featured: false
  },
  {
    title: "3DDR-4012 3D Main Door Carving Model",
    designCode: "3DDR-4012",
    category: "3D Door Design",
    price: 650,
    originalPrice: 750,
    discountPercent: 13,
    fileFormats: ["RLF", "STL", "3DS"],
    software: ["Artcam", "3ds Max", "JDPaint"],
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80"
    ],
    size: "7x3 Feet Door Sizing",
    description: "Intricate solid teak wood main door 3D relief model with elephant/peacock motif details.",
    isDigital: true,
    inStock: true,
    featured: true
  },
  {
    title: "3DMN-1005 Mandir Temple Arch 3D Model",
    designCode: "3DMN-1005",
    category: "Temple & Mandir",
    price: 850,
    originalPrice: 990,
    discountPercent: 14,
    fileFormats: ["RLF", "STL"],
    software: ["Artcam", "JDPaint", "Aspire"],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80"
    ],
    size: "Custom Temple Front",
    description: "Detailed traditional Wooden Temple Arch & Dome 3D CNC Artcam relief model.",
    isDigital: true,
    inStock: true,
    featured: true
  }
];

// @desc    Get all products
// @route   GET /api/products
exports.getProducts = async (req, res) => {
  try {
    let products = await Product.find().sort({ createdAt: -1 });
    
    // Seed initial products if DB has none
    if (products.length === 0) {
      await Product.insertMany(SAMPLE_PRODUCTS);
      products = await Product.find().sort({ createdAt: -1 });
    }
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
exports.getProductById = async (req, res) => {
  try {
    let product;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(req.params.id);
    }
    
    // Fallback search by designCode if not valid ObjectId or not found
    if (!product) {
      product = await Product.findOne({ designCode: req.params.id });
    }

    if (!product) {
      // Check sample list as fallback
      const sample = SAMPLE_PRODUCTS.find(p => p.designCode === req.params.id || p.title.includes(req.params.id));
      if (sample) {
        return res.json(sample);
      }
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create product', error: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update product', error: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
};
