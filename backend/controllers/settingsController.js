const SiteContent = require('../models/SiteContent');
const sendResponse = require('../utils/responseHandler');
const asyncHandler = require('../middleware/asyncHandler');

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
  if (!settings) {
    settings = new SiteContent();
  }

  // Dynamically update fields
  Object.assign(settings, req.body);
  await settings.save();

  return sendResponse(res, 200, 'Global settings updated successfully', settings);
});
