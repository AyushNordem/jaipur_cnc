const Gallery = require('../models/Gallery');
const sendResponse = require('../utils/responseHandler');
const asyncHandler = require('../middleware/asyncHandler');

// @route   GET /api/gallery
// @desc    Get list of all creations / gallery items
// @access  Public
exports.getGalleryItems = asyncHandler(async (req, res, next) => {
  const { category } = req.query;
  const filter = {};
  if (category && category !== 'All') {
    filter.category = category;
  }

  const items = await Gallery.find(filter).sort({ createdAt: -1 });
  return sendResponse(res, 200, 'Gallery items retrieved successfully', items);
});

// @route   POST /api/gallery
// @desc    Add a new creation item to gallery
// @access  Admin
exports.createGalleryItem = asyncHandler(async (req, res, next) => {
  const { title, category, imageUrl, description } = req.body;

  if (!title || !imageUrl) {
    const error = new Error('Creation Title and Image URL are required');
    error.statusCode = 400;
    return next(error);
  }

  const newItem = await Gallery.create({
    title,
    category: category || 'General',
    imageUrl,
    description: description || ''
  });

  return sendResponse(res, 201, 'Creation item added successfully', newItem);
});

// @route   PUT /api/gallery/:id
// @desc    Update a creation item by ID
// @access  Admin
exports.updateGalleryItem = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  let item = await Gallery.findById(id);
  if (!item) {
    const error = new Error('Creation item not found');
    error.statusCode = 404;
    return next(error);
  }

  Object.assign(item, req.body);
  await item.save();

  return sendResponse(res, 200, 'Creation item updated successfully', item);
});

// @route   DELETE /api/gallery/:id
// @desc    Delete a creation item by ID
// @access  Admin
exports.deleteGalleryItem = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const item = await Gallery.findByIdAndDelete(id);
  if (!item) {
    const error = new Error('Creation item not found');
    error.statusCode = 404;
    return next(error);
  }

  return sendResponse(res, 200, 'Creation item deleted successfully', { id });
});
