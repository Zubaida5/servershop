const orderController = require('../controllers/orderController');
const { addBody, addVarBody } = require('../middlewares/dynamicMiddleware');
const { protect, restrictTo } = require('./../middlewares/authMiddlewers');
const { RoleCode } = require('./../utils/enum');
const { USER, ADMIN } = RoleCode;
const express = require('express');
const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(restrictTo(USER, ADMIN), orderController.getAllOrder)
  .post(
    restrictTo(USER),
    addVarBody('userId', 'userId'),
    orderController.createOrder,
  );

router.route('/mine').get(restrictTo(USER), orderController.getMyOrders);
router.route('/my-stats').get(restrictTo(USER), orderController.getMyStats);

router
  .route('/:id/status')
  .patch(restrictTo(ADMIN), orderController.updateOrderStatus);

router
  .route('/:id')
  .get(restrictTo(USER, ADMIN), orderController.getOrder)
  .delete(restrictTo(ADMIN), orderController.deleteOrder);

module.exports = router;
