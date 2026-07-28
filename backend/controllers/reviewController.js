const Review = require('../models/Review');
const sendResponse = require('../utils/responseHandler');
const asyncHandler = require('../middleware/asyncHandler');

// @route   GET /api/reviews
// @desc    Get all customer reviews from MongoDB
// @access  Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  const reviews = await Review.find().sort({ createdAt: -1 });
  return sendResponse(res, 200, 'Reviews retrieved successfully', reviews);
});

// @route   POST /api/reviews
// @desc    Add a new customer review
// @access  Admin
exports.createReview = asyncHandler(async (req, res, next) => {
  const { clientName, quote, rating, clientLocation, clientAvatar, workType, date } = req.body;

  if (!clientName || !quote) {
    const error = new Error('Client Name and Review Quote are required');
    error.statusCode = 400;
    return next(error);
  }

  const newReview = await Review.create({
    clientName,
    quote,
    rating: Number(rating) || 5,
    clientLocation: clientLocation || '',
    clientAvatar: clientAvatar || '',
    workType: workType || '',
    date: date ? new Date(date) : new Date()
  });

  return sendResponse(res, 201, 'Review created successfully', newReview);
});

// @route   PUT /api/reviews/:id
// @desc    Update an existing review
// @access  Admin
exports.updateReview = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  let review = await Review.findById(id);
  if (!review) {
    const error = new Error('Review not found');
    error.statusCode = 404;
    return next(error);
  }

  Object.assign(review, req.body);
  await review.save();

  return sendResponse(res, 200, 'Review updated successfully', review);
});

// @route   DELETE /api/reviews/:id
// @desc    Delete a review
// @access  Admin
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const review = await Review.findByIdAndDelete(id);
  if (!review) {
    const error = new Error('Review not found');
    error.statusCode = 404;
    return next(error);
  }

  return sendResponse(res, 200, 'Review deleted successfully', { id });
});
