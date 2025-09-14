const factory = require('./handlerFactories');
const Brand = require('../Models/brandModel');
const { uploadSingleImage, handleSingleImageUpload } = require('../Middleware/uploadImageMiddleware');
const expressAsyncHandler = require('express-async-handler');

// Upload single image
exports.uploadBrandImage = uploadSingleImage('image');
exports.processBrandImage = handleSingleImageUpload('image');

// Fonction personnalisée pour récupérer les marques avec le nombre de produits associés
exports.getBrands = expressAsyncHandler(async (req, res) => {
  const brands = await Brand.aggregate([
    {
      $lookup: {
        from: 'products', 
        localField: '_id',
        foreignField: 'brand',
        as: 'products',
      },
    },
    {
      $project: {
        name: 1,
        slug: 1,
        image: 1,
        productsCount: { $size: '$products' }, 
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    results: brands.length,
    data: brands,
  });
});

// @desc    Get specific brand by Name
// @route   GET /api/v1/brands/name/:name
// @access  Public
exports.getBrandsByName = factory.getByName(Brand);

// @desc    Get specific brand by id
// @route   GET /api/v1/brands/:id
// @access  Public
exports.getBrand = factory.getOne(Brand);

// @desc    Create brand
// @route   POST  /api/v1/brands
// @access  Private
exports.createBrand = factory.createOne(Brand);

// @desc    Update specific brand
// @route   PUT /api/v1/brands/:id
// @access  Private
exports.updateBrand = factory.updateOne(Brand);

// @desc    Delete specific brand
// @route   DELETE /api/v1/brands/:id
// @access  Private
exports.deleteBrand = factory.deleteOne(Brand);