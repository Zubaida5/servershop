const orderController = require('../controllers/orderController');

const { addBody, addVarBody } = require('../middlewares/dynamicMiddleware');

const {
  uploadPhoto,
  setUploadedPath,
} = require('../middlewares/dynamicImgMiddlewers');

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

    // قراءة multipart/form-data
    uploadPhoto('orders', 'paymentImage'),

    // حفظ مسار صورة الدفع داخل req.body
    setUploadedPath('orders', 'paymentImage'),

    // إضافة userId تلقائياً
    addVarBody('userId', 'userId'),

    orderController.createOrder,
  );

router.route('/mine').get(restrictTo(USER), orderController.getMyOrders);

router.route('/my-stats').get(restrictTo(USER), orderController.getMyStats);

router
  .route('/mine/invoices')
  .get(restrictTo(USER), orderController.getMyInvoices);

router
  .route('/:id/status')
  .patch(restrictTo(ADMIN), orderController.updateOrderStatus);

router
  .route('/:id/cancel')
  .patch(restrictTo(USER), orderController.cancelOrder);

router
  .route('/:id')
  .get(restrictTo(USER, ADMIN), orderController.getOrder)
  .delete(restrictTo(ADMIN), orderController.deleteOrder);

module.exports = router;
