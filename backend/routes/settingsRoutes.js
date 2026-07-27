const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/settingsController');

// @route   GET /api/settings
// @desc    Get all global site settings
// @access  Public
router.get('/', getSettings);

// @route   PUT /api/settings
// @desc    Update global site settings
// @access  Admin
router.put('/', updateSettings);

module.exports = router;
