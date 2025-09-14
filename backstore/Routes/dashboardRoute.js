const express = require('express');
const { protect, restrictTo } = require('../Middleware/authMiddleware');
const {
  getDashboardStats,
  getRevenueData,
  getTopSellingProducts,
  getCustomerLocations,
  getMyProductsCount
} = require('../Controllers/dashboardController');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(protect);

// Route for user's own products (accessible to all authenticated users)
router.get('/my-products', getMyProductsCount);

// Apply admin restriction to other routes
router.use(restrictTo('admin', 'superadmin'));

// Dashboard statistics routes
router.get('/stats', getDashboardStats);
router.get('/revenue', getRevenueData);
router.get('/top-selling', getTopSellingProducts);
router.get('/customer-locations', getCustomerLocations);

module.exports = router;
