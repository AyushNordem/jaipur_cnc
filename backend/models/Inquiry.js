const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, default: '' },
  material: { type: String, default: '' },
  patternType: { type: String, default: '' },
  sizeQuantity: { type: String, default: '' },
  message: { type: String, default: '' },
  status: { 
    type: String, 
    enum: ['New', 'Contacted', 'In Progress', 'Completed', 'Cancelled'], 
    default: 'New' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', inquirySchema);
