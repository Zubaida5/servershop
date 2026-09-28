const express = require('express');
const reviewController = require('../controllers/reviewController');
const { protect, restrictTo } = require('./../middlewares/authMiddlewers');
const { addVarBody } = require('./../middlewares/dynamicMiddleware');
const { RoleCode } = require('./../utils/enum');
const { USER, ADMIN } = RoleCode;

const router = express.Router();

// 1. مسارات جلب المراجعات العامة (متاحة للجميع بدون تسجيل دخول)
router.route('/').get(reviewController.getAllReview);
router.route('/:id').get(reviewController.getReview);

// 2. تفعيل الحماية لكل المسارات بالأسفل (يجب أن تسبق أي عملية فحص صلاحيات)
router.use(protect);

// 3. المسارات المحمية الخاصة بالمستخدمين والمسؤولين
router
  .route('/')
  .post(
    restrictTo(USER),
    addVarBody('userId', 'userId'),
    reviewController.createReview,
  );

router.get('/mine', reviewController.getMyReviews);

router
  .route('/:id')
  .patch(restrictTo(USER), reviewController.updateReview)
  .delete(restrictTo(ADMIN), reviewController.deleteReview);

module.exports = router;
