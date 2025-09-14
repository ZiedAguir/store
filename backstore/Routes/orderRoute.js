const express = require('express');
const {
  createCashOrder,
  findAllOrders,
  findSpecificOrder,
  filterOrderForLoggedUser,
  updateOrderToPaid,
  updateOrderToDelivered,
  checkoutSession,
  deleteOrder,
  updateAdminStatusBulk,
  markOrderInvoiced,
} = require('../Controllers/orderController');

const { protect, restrictTo } = require('../Middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.get(
  '/checkout-session/:cartId',
  restrictTo('user'),
  checkoutSession
);

router.route('/:cartId').post(restrictTo('user'), createCashOrder);
router.get(
  '/',
  restrictTo('user', 'admin', 'superadmin'),
  filterOrderForLoggedUser,
  findAllOrders
);
router.get('/:id', findSpecificOrder);

router.put(
  '/:id/pay',
  restrictTo('admin', 'superadmin'),
  updateOrderToPaid
);
router.put(
  '/:id/deliver',
  restrictTo('admin', 'superadmin'),
  updateOrderToDelivered
);

router.delete(
  '/:id',
  restrictTo('user', 'admin', 'superadmin'),
  deleteOrder
);

router.put(
  '/admin-status',
  restrictTo('admin', 'superadmin'),
  updateAdminStatusBulk
);

router.put(
  '/:id/invoice',
  restrictTo('admin', 'superadmin'),
  markOrderInvoiced
);

module.exports = router;