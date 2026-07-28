const express = require('express');
const router = express.Router();
const {
  getReviews,
  createReview,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');

// @route   GET /api/reviews
// @desc    Get all reviews
router.get('/', getReviews);

// @route   POST /api/reviews
// @desc    Create a new review
router.post('/', createReview);

// @route   PUT /api/reviews/:id
// @desc    Update a review by ID
router.put('/:id', updateReview);

// @route   DELETE /api/reviews/:id
// @desc    Delete a review by ID
router.delete('/:id', deleteReview);

module.exports = router;
