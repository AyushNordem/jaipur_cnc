const express = require('express');
const router = express.Router();
const {
  getInquiries,
  createInquiry,
  updateInquiryStatus,
  deleteInquiry
} = require('../controllers/inquiryController');

// @route   GET /api/inquiries
// @desc    Get all inquiries
router.get('/', getInquiries);

// @route   POST /api/inquiries
// @desc    Submit a quote inquiry
router.post('/', createInquiry);

// @route   PUT /api/inquiries/:id
// @desc    Update inquiry status or data
router.put('/:id', updateInquiryStatus);

// @route   DELETE /api/inquiries/:id
// @desc    Delete an inquiry
router.delete('/:id', deleteInquiry);

module.exports = router;
