const mongoose = require('mongoose');

const siteContentSchema = new mongoose.Schema({
  // Business Details
  logoUrl: { type: String, default: '' },
  siteName: { type: String, default: '' },
  contactPhone: { type: String, default: '' },
  contactEmail: { type: String, default: '' },
  whatsappUrl: { type: String, default: '' },
  address: { type: String, default: '' },
  locationUrl: { type: String, default: '' },

  // Business Metrics
  happyCustomersCount: { type: String, default: '' },
  completedProjectsCount: { type: String, default: '' },
  yearsExperienceCount: { type: String, default: '' },
  totalBranchesCount: { type: String, default: '' },

  // Social Links
  facebookUrl: { type: String, default: '' },
  instagramUrl: { type: String, default: '' },
  youtubeUrl: { type: String, default: '' },
  googleBusinessUrl: { type: String, default: '' },
  linkedinUrl: { type: String, default: '' },
  twitterUrl: { type: String, default: '' },
  pinterestUrl: { type: String, default: '' },
  telegramUrl: { type: String, default: '' },
  threadsUrl: { type: String, default: '' },

  // Page Header Background Images
  servicesHeroImage: { type: String, default: '' },
  creationsHeroImage: { type: String, default: '' },
  aboutHeroImage: { type: String, default: '' },
  contactHeroImage: { type: String, default: '' },

  // Website Content Media & Videos
  servicesVideoUrl: { type: String, default: '' },
  ourStoryImage: { type: String, default: '' }
}, { 
  timestamps: true,
  strict: true
});

module.exports = mongoose.model('SiteContent', siteContentSchema);
