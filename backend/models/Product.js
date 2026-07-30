const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Product title is required'],
    trim: true
  },
  designCode: {
    type: String,
    required: [true, 'Design code is required'],
    trim: true
  },
  category: {
    type: String,
    default: '3D Wall Panel',
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required']
  },
  originalPrice: {
    type: Number,
    default: 500
  },
  discountPercent: {
    type: Number,
    default: 4
  },
  fileFormats: {
    type: [String],
    default: ['RLF', 'STL']
  },
  software: {
    type: [String],
    default: ['Artcam 2008-2018', '3ds Max', 'JDPaint', 'AutoCAD', 'Aspire']
  },
  images: {
    type: [String],
    default: []
  },
  size: {
    type: String,
    default: '8x4 Feet (Adjustable)'
  },
  description: {
    type: String,
    default: ''
  },
  isDigital: {
    type: Boolean,
    default: true
  },
  inStock: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
