const reviewController = require('../controllers/reviewController');
const { protect, restrictTo } = require('./../middlewares/authMiddlewers');
const { addVarBody, addQuery } = require('./../middlewares/dynamicMiddleware');
const { RoleCode } = require('./../utils/enum');
const { USER, ADMIN } = RoleCode;
const express = require('express');
const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(reviewController.getAllReview)
  .post(
    restrictTo(USER),
    addVarBody('userId', 'userId'),
    reviewController.createReview,
  );

router.get('/mine', reviewController.getMyReviews);

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(restrictTo(USER), reviewController.updateReview)
  .delete(restrictTo(ADMIN), reviewController.deleteReview);

module.exports = router;
