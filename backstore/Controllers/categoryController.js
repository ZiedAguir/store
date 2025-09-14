

const factory = require('./handlerFactories');
const Category = require('../Models/categoryModel');
const { uploadSingleImage, handleSingleImageUpload } = require('../Middleware/uploadImageMiddleware');
const expressAsyncHandler = require('express-async-handler');

// Upload single image
exports.uploadCategoryImage = uploadSingleImage('image');
exports.processCategoryImage = handleSingleImageUpload('image');



// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public
exports.getCategories = factory.getAll(Category);

// @desc    Get by name  categories
// @route   GET /api/v1/categories
// @access  Public
exports.getByNameCategories = factory.getByName(Category);

// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getCategory = factory.getOne(Category);

// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private/SuperAdmin-admin
exports.createCategory = factory.createOne(Category);

// @desc    Update specific category
// @route   PUT /api/v1/categories/:id
// @access  Private/SuperAdmin-admin
exports.updateCategory =factory.updateOne(Category);
// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private/Admin
exports.deleteCategory = factory.deleteOne(Category);