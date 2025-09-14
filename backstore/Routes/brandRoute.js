const express = require('express');
const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require('../utils/ValidatorRules/brandValidator');


const {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
  processBrandImage,
  getBrandsByName,
  
} = require('../Controllers/brandController');
const { uploadBrandImage } = require('../Controllers/brandController');
const { protect, restrictTo } = require('../Middleware/authMiddleware');

const router = express.Router();
router.get('/name/:name', getBrandsByName);
router
  .route('/')
  .get(getBrands)
  .post(
    protect,
    restrictTo('admin', 'superadmin'),
    uploadBrandImage,
    processBrandImage,
    createBrandValidator,
    createBrand
  );
router
  .route('/:id')
  .get(getBrandValidator, getBrand)
  .put(
   protect,
       restrictTo('admin', 'superadmin'),
    uploadBrandImage,
    processBrandImage,
    updateBrandValidator,
    updateBrand
  )
  .delete(
    protect,
    restrictTo('admin', 'superadmin'),
    deleteBrandValidator,
    deleteBrand
  );

module.exports = router;