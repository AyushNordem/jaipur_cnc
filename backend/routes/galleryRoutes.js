const express = require('express');
const router = express.Router();
const {
  getGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
} = require('../controllers/galleryController');

// @route   GET /api/gallery
// @desc    Get all creation items
router.get('/', getGalleryItems);

// @route   POST /api/gallery
// @desc    Add a creation item
router.post('/', createGalleryItem);

// @route   PUT /api/gallery/:id
// @desc    Update a creation item
router.put('/:id', updateGalleryItem);

// @route   DELETE /api/gallery/:id
// @desc    Delete a creation item
router.delete('/:id', deleteGalleryItem);

module.exports = router;
