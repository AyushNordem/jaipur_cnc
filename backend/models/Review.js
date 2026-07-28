const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  clientLocation: { type: String, default: '' },
  clientAvatar: { type: String, default: '' },
  quote: { type: String, required: true },
  rating: { type: Number, required: true, default: 5, min: 1, max: 5 },
  workType: { type: String, default: '' },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
