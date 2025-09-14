const express = require('express');

const {
  getCoupon,
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} = require('../Controllers/couponController');

const { protect, restrictTo } = require('../Middleware/authMiddleware');


const router = express.Router();
router.use(protect, restrictTo('admin', 'superadmin'));


router.route('/').get(getCoupons).post(createCoupon);
router.route('/:id').get(getCoupon).put(updateCoupon).delete(deleteCoupon);

module.exports = router;