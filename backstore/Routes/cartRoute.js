const express = require('express');

const {
  addProductToCart,
  getLoggedUserCart,
  removeSpecificCartItem,
  clearCart,
  updateCartItemQuantity,
  applyCoupon,
} = require('../Controllers/cartController');

const router = express.Router();
const { protect, restrictTo } = require('../Middleware/authMiddleware');
router.use(protect, restrictTo('user'));

router
  .route('/')
  .post(addProductToCart)
  .get(getLoggedUserCart)
  .delete(clearCart);

router.put('/applyCoupon', applyCoupon);

router
  .route('/:itemId')
  .put(updateCartItemQuantity)
  .delete(removeSpecificCartItem);

module.exports = router;