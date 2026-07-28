const { uploadMediaToCloudinary } = require('../config/cloudinary');
const sendResponse = require('../utils/responseHandler');
const asyncHandler = require('../middleware/asyncHandler');

// Controller for image and video uploads
exports.uploadMedia = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    const error = new Error('No file uploaded');
    error.statusCode = 400;
    return next(error);
  }

  // Upload file to Cloudinary (or local fallback)
  const mediaUrl = await uploadMediaToCloudinary(req.file.path, 'jaipur_cnc');

  return sendResponse(res, 200, 'Media uploaded successfully to Cloudinary', {
    url: mediaUrl
  });
});
