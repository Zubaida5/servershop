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
router
  .route('/:id')
  .get(restrictTo(USER, ADMIN), orderController.getOrder)
  .patch(restrictTo(USER), orderController.updateOrder)
  .delete(restrictTo(USER, ADMIN), orderController.deleteOrder);
module.exports = router;
