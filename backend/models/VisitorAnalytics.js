const mongoose = require('mongoose');

const visitorAnalyticsSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true }, // YYYY-MM-DD
  dayName: { type: String, required: true }, // Mon, Tue, Wed...
  visitors: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('VisitorAnalytics', visitorAnalyticsSchema);
