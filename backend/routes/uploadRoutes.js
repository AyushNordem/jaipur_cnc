const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { uploadMedia } = require('../controllers/uploadController');

// Multer temporary disk storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// @route   POST /api/upload
// @desc    Upload image or video file to Cloudinary
// @access  Public / Admin
router.post('/', upload.single('image'), uploadMedia);

module.exports = router;
