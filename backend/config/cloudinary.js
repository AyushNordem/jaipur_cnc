const cloudinary = require('cloudinary').v2;
const fs = require('fs');

/**
 * Uploads file to Cloudinary and returns full Cloudinary HTTPS URL.
 * If Cloudinary API credentials fail, falls back to local server storage (/uploads/...)
 * @param {String} filePath - Path to uploaded file
 * @param {String} folder - Cloudinary target folder
 * @returns {Promise<String>} - Full URL or Local Storage URL
 */
const uploadMediaToCloudinary = async (filePath, folder = 'jaipur_cnc') => {
  const cloudName = (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_CLOUD_NAME !== 'jaipurartscnc') 
    ? process.env.CLOUDINARY_CLOUD_NAME 
    : 'dz4ryea9h';

  cloudinary.config({
    cloud_name: cloudName,
    api_key: process.env.CLOUDINARY_API_KEY || '438725585372145',
    api_secret: process.env.CLOUDINARY_API_SECRET || 'PztPf3uTb5CHhARJTVVS28xfig4',
    secure: true
  });

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      resource_type: 'auto'
    });

    // Clean up local temporary file after successful Cloudinary upload
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    console.log('[Cloudinary Upload Success] Full HTTPS URL:', result.secure_url);
    return result.secure_url;
  } catch (error) {
    console.warn('[Cloudinary Warning] Cloudinary upload encountered an issue:', error.message);
    console.warn('[Cloudinary Fallback] Storing file locally in /uploads directory.');

    // Return local storage path so user upload NEVER breaks!
    const fileName = filePath.split(/[\\/]/).pop();
    return `/uploads/${fileName}`;
  }
};

module.exports = {
  cloudinary,
  uploadMediaToCloudinary
};
