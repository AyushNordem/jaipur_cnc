const express = require('express');
const router = express.Router();
const { adminLogin } = require('../controllers/authController');

// @route   POST /api/auth/login
// @desc    Admin login authentication
// @access  Public
router.post('/login', adminLogin);

module.exports = router;
