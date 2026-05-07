const mongoose = require('mongoose');

const siteContentSchema = new mongoose.Schema({
  // Global settings
  logoUrl: { type: String, default: '/logo.png' },
  siteName: { type: String, default: 'Jaipur Arts CNC' },
  contactPhone: { type: String, default: '90010-21857' },
  contactEmail: { type: String, default: 'jaipurartscnc@gmail.com' },
  address: { type: String, default: 'Shop No. 2, Narayan Vihar Asarpura, Jaipur' },
  
  // Social Links
  facebookUrl: { type: String, default: '#' },
  instagramUrl: { type: String, default: 'https://instagram.com/jaipurartscnc' },
  whatsappUrl: { type: String, default: 'https://wa.me/919001021857' },
  youtubeUrl: { type: String, default: '#' },
  locationUrl: { type: String, default: '#' },

  // Home Page
  heroTitle: { type: String, default: 'Premium CNC Cutting\n& Carving' },
  heroSubtitle: { type: String, default: 'Wood | Stone | Metal | Acrylic\nPrecision crafting with modern technology, fast delivery, and professional finishing.' },
  homeHeroImage: { type: String, default: '' },
  
  // Other Pages Hero Images
  servicesHeroImage: { type: String, default: '' },
  creationsHeroImage: { type: String, default: '' },
  aboutHeroImage: { type: String, default: '' },
  contactHeroImage: { type: String, default: '' },
  
  // About Page specific images
  ourStoryImage: { type: String, default: '' },
  aboutContentImage: { type: String, default: '' },
  craftsmanshipImage: { type: String, default: '' },

  // Business Metrics
  happyCustomersCount: { type: String, default: '5,000+' },
  completedProjectsCount: { type: String, default: '12,500' },
  activeResourcesCount: { type: String, default: '45' },
  totalBranchesCount: { type: String, default: '3' },
  
  // Dynamic arrays can be stored here or in separate collections
  // For simplicity, we can store small arrays of objects directly here
  services: [{
    title: String,
    description: String,
    icon: String // Or image url
  }],

  testimonials: [{
    clientName: String,
    quote: String,
    rating: Number,
    date: { type: Date, default: Date.now }
  }],

  galleryImages: [{
    url: String,
    title: String,
    category: String
  }]

}, { timestamps: true });

module.exports = mongoose.model('SiteContent', siteContentSchema);
