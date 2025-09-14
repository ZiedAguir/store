const { uploadSingleImage, handleSingleImageUpload } = require("../Middleware/uploadImageMiddleware");
const Review = require("../Models/ReviewUser/reviewUser");
const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");
const userModel = require("../Models/user");
const Product = require("../Models/productModel");
const factory = require("../Controllers/handlerFactories");

// Middleware to upload and handle a single review image
exports.uploadReviewImage = uploadSingleImage('image'); 
exports.processReviewImage = handleSingleImageUpload('image');

// @desc    Create a Review for a product
// @route   POST /api/v1/review/create-review
// @access  Public
exports.createReview = asyncHandler(async (req, res, next) => {
  const { message, image, productId, rating } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return next(new ApiError("Accès interdit, utilisateur non identifié.", 401));
  }
  if (!productId) {
    return next(new ApiError("productId is required", 400));
  }
  if (!rating || rating < 1 || rating > 5) {
    return next(new ApiError("rating must be between 1 and 5", 400));
  }
  const newReview = await Review.create({
    message,
    user: userId,
    product: productId,
    rating,
    image: image || null,
    });

  res.status(201).json({
    success: true,
    message: "Review created successfully",
    review: newReview,
  });
});

// @desc Get specific review by ID
// @route GET /api/v1/review/:id
// @access Public
exports.getReviewById = factory.getOne(Review);

// @desc Get reviews for a product
// @route GET /api/v1/review?product=PRODUCT_ID
// @access Public
exports.getAllReview = factory.getAll(Review);
// @desc Delete a Review
// @route DELETE /api/v1/review/:id
// @access Public
exports.deleteReview = factory.deleteOne(Review);

// @desc    Mettre à jour une Review
// @route   PUT /api/v1/review/update-review/:id
// @access  Public
exports.updateReview = asyncHandler(async (req, res, next) => {
  const { message, image } = req.body;
  const userId = req.user?.id;
  const reviewId = req.params.id;

  if (!userId) {
    return next(new ApiError("Accès interdit, utilisateur non identifié.", 401));
  }

  const review = await Review.findById(reviewId);
  if (!review) {
    return next(new ApiError("Review non trouvée", 404));
  }

  if (review.user.toString() !== userId) {
    return next(new ApiError("Vous ne pouvez pas modifier cette review", 403));
  }

  review.message = message || review.message;
  review.image = image || review.image;

  await review.save();

  res.status(200).json({
    success: true,
    message: "Review mise à jour avec succès",
    review,
  });
});

// @desc    Get reviews for products created by a specific user (creator)
// @route   GET /api/v1/review/for-creator/:userId
// @access  Public
exports.getReviewsForCreator = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const products = await Product.find({ creator: userId }).select('_id');
  const productIds = products.map(p => p._id);
  if (productIds.length === 0) {
    return res.status(200).json({ results: 0, data: [] });
  }
  const reviews = await Review.find({ product: { $in: productIds } })
    .populate({ path: 'user', select: 'name profileImg _id', model: 'user' })
    .populate({ path: 'product', select: 'title imageCover _id', model: 'Product' })
    .sort({ createdAt: -1 });
  res.status(200).json({ results: reviews.length, data: reviews });
});

