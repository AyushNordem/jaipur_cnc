const Inquiry = require('../models/Inquiry');
const sendResponse = require('../utils/responseHandler');
const asyncHandler = require('../middleware/asyncHandler');

// @route   GET /api/inquiries
// @desc    Get all customer inquiries sorted by newest
// @access  Admin
exports.getInquiries = asyncHandler(async (req, res, next) => {
  const inquiries = await Inquiry.find().sort({ createdAt: -1 });
  return sendResponse(res, 200, 'Inquiries retrieved successfully', inquiries);
});

// @route   POST /api/inquiries
// @desc    Submit a new customer quote inquiry
// @access  Public
exports.createInquiry = asyncHandler(async (req, res, next) => {
  const { fullName, phone, email, material, patternType, sizeQuantity, message } = req.body;

  if (!fullName || !phone) {
    const error = new Error('Full Name and Phone Number are required');
    error.statusCode = 400;
    return next(error);
  }

  const newInquiry = await Inquiry.create({
    fullName,
    phone,
    email: email || '',
    material: material || '',
    patternType: patternType || '',
    sizeQuantity: sizeQuantity || '',
    message: message || '',
    status: 'New'
  });

  return sendResponse(res, 201, 'Inquiry submitted successfully', newInquiry);
});

// @route   PUT /api/inquiries/:id
// @desc    Update inquiry status or details
// @access  Admin
exports.updateInquiryStatus = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  let inquiry = await Inquiry.findById(id);
  if (!inquiry) {
    const error = new Error('Inquiry not found');
    error.statusCode = 404;
    return next(error);
  }

  if (status) inquiry.status = status;
  Object.assign(inquiry, req.body);
  await inquiry.save();

  return sendResponse(res, 200, 'Inquiry updated successfully', inquiry);
});

// @route   DELETE /api/inquiries/:id
// @desc    Delete an inquiry
// @access  Admin
exports.deleteInquiry = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const inquiry = await Inquiry.findByIdAndDelete(id);
  if (!inquiry) {
    const error = new Error('Inquiry not found');
    error.statusCode = 404;
    return next(error);
  }

  return sendResponse(res, 200, 'Inquiry deleted successfully', { id });
});
