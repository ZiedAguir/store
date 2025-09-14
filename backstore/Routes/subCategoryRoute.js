const express = require('express');

const {
  createSubCategory,
  getSubCategory,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdToBody,
  createFilterObj,
  getSubcategoriesByName,
} = require('../Controllers/subCategoryController');
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require('../utils/ValidatorRules/subCategoryValidator');
const { protect, restrictTo } = require('../Middleware/authMiddleware');


// mergeParams: Allow us to access parameters on other routers
// ex: We need to access categoryId from category router
const router = express.Router({ mergeParams: true });

router.get('/name/:name', getSubcategoriesByName);
router
  .route('/')
  .post(
     protect,
       restrictTo('admin', 'superadmin'),
    setCategoryIdToBody,
    createSubCategoryValidator,
    createSubCategory
  )
  .get(createFilterObj, getSubCategories);
router
  .route('/:id')
  .get(getSubCategoryValidator, getSubCategory)
  .put(
    protect,
    restrictTo('admin', 'superadmin'),
    updateSubCategoryValidator,
    updateSubCategory
  )
  .delete(
    protect,
   restrictTo('admin', 'superadmin'),
    deleteSubCategoryValidator,
    deleteSubCategory
  );

module.exports = router;