const express = require('express');

const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require('../utils/ValidatorRules/categoryValidator');

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
  processCategoryImage,
  getByNameCategories,
} = require('../Controllers/categoryController');


const subcategoriesRoute = require('./subCategoryRoute');
const { protect, restrictTo } = require('../Middleware/authMiddleware');

const router = express.Router();

// Nested route
router.use('/:categoryId/subcategories', subcategoriesRoute);
router.get('/name/:name', getByNameCategories);
router
  .route('/')
  .get(getCategories)
  // Admin and Super Admin only: create, update, and delete categories
  .post(
    protect,
    restrictTo('admin', 'superadmin'),
    uploadCategoryImage,
    processCategoryImage,
    createCategoryValidator,
    createCategory
  );
router
  .route('/:id')
  .get(getCategoryValidator, getCategory)
  .put(
   protect,
    restrictTo('admin', 'superadmin'),
    uploadCategoryImage,
    processCategoryImage,
    updateCategoryValidator,
    updateCategory
  )
  .delete(
    protect,
    restrictTo('admin', 'superadmin'),
    deleteCategoryValidator,
    deleteCategory
  );

module.exports = router;