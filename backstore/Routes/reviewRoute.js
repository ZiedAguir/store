const express = require('express');
const { protect, restrictTo } = require('../Middleware/authMiddleware');
const { uploadReviewImage,processReviewImage, createReview, getReviewById, deleteReview, updateReview, getAllReview, getReviewsForCreator } = require('../Controllers/reviewController');

const router = express.Router();

router.get('/:id', getReviewById);
router.get('/', getAllReview);
router.get('/for-creator/:userId', getReviewsForCreator);

router.post(
  '/create-review',
  protect, 
  uploadReviewImage, 
  processReviewImage,
  createReview 
);
router.put(
  '/update-review/:id',
  protect, 
  uploadReviewImage,processReviewImage, 
  updateReview 
);
  router.delete('/:id',protect,deleteReview);


module.exports = router;