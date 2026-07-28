const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Configure Cloudinary from Environment Variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || ''
});

/**
 * Uploads local file to Cloudinary with fallback to local server URL
 * @param {String} filePath - Path to temporary uploaded file
 * @param {String} folder - Target Cloudinary folder name
 * @returns {Promise<String>} - Public secure URL of uploaded media
 */
const uploadMediaToCloudinary = async (filePath, folder = 'jaipur_cnc') => {
  const isCloudinaryConfigured = 
    process.env.CLOUDINARY_CLOUD_NAME && 
    process.env.CLOUDINARY_API_KEY && 
    process.env.CLOUDINARY_API_KEY !== 'your_cloudinary_api_key';

  if (!isCloudinaryConfigured) {
    console.log('[Cloudinary Config] Cloudinary credentials not fully set. Returning local storage URL.');
    // Return relative local storage path
    const fileName = filePath.split(/[\\/]/).pop();
    return `/uploads/${fileName}`;
  }

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      resource_type: 'auto' // Supports both image and video uploads
    });

    // Remove temporary local file after successful Cloudinary upload
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return result.secure_url;
  } catch (error) {
    console.error('[Cloudinary Upload Error]:', error.message);
    // Fallback to local storage URL if Cloudinary call fails
    const fileName = filePath.split(/[\\/]/).pop();
    return `/uploads/${fileName}`;
  }
};

module.exports = {
  cloudinary,
  uploadMediaToCloudinary
};
