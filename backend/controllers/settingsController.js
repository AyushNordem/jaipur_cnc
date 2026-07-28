const SiteContent = require('../models/SiteContent');
const sendResponse = require('../utils/responseHandler');
const asyncHandler = require('../middleware/asyncHandler');

// Allowed active Global Settings keys
const ALLOWED_KEYS = [
  'logoUrl', 'siteName', 'contactPhone', 'contactEmail', 'whatsappUrl', 'address', 'locationUrl',
  'happyCustomersCount', 'completedProjectsCount', 'yearsExperienceCount', 'totalBranchesCount',
  'facebookUrl', 'instagramUrl', 'youtubeUrl', 'googleBusinessUrl', 'linkedinUrl',
  'twitterUrl', 'pinterestUrl', 'telegramUrl', 'threadsUrl',
  'servicesHeroImage', 'creationsHeroImage', 'aboutHeroImage', 'contactHeroImage',
  'servicesVideoUrl', 'ourStoryImage'
];

// Get Global Settings
exports.getSettings = asyncHandler(async (req, res, next) => {
  let settings = await SiteContent.findOne();
  if (!settings) {
    settings = await SiteContent.create({});
  }
  return sendResponse(res, 200, 'Global settings retrieved successfully', settings);
});

// Update Global Settings
exports.updateSettings = asyncHandler(async (req, res, next) => {
  let settings = await SiteContent.findOne();
  
  // Filter body payload to include ONLY allowed global settings keys
  const filteredPayload = {};
  ALLOWED_KEYS.forEach(key => {
    if (req.body[key] !== undefined) {
      filteredPayload[key] = req.body[key];
    }
  });

  if (!settings) {
    settings = new SiteContent(filteredPayload);
  } else {
    // Update active keys
    ALLOWED_KEYS.forEach(key => {
      if (filteredPayload[key] !== undefined) {
        settings[key] = filteredPayload[key];
      }
    });
  }

  await settings.save();

  return sendResponse(res, 200, 'Global settings updated successfully', settings);
});
