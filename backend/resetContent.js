const mongoose = require('mongoose');
require('dotenv').config();
const SiteContent = require('./models/SiteContent');

async function resetDefaults() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jaipurcnc');
    await SiteContent.deleteMany({});
    console.log('MongoDB SiteContent reset successfully. All default hardcoded strings removed!');
    process.exit(0);
  } catch (err) {
    console.error('Error resetting MongoDB:', err);
    process.exit(1);
  }
}

resetDefaults();
