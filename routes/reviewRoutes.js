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
  .get(restrictTo(ADMIN), reviewController.getAllReview)
  .post(
    restrictTo(USER),
    addVarBody('userId', 'userId'),
    reviewController.createReview,
  );
router
  .route('/mine')
  .get(
    restrictTo(USER),
    addQuery('userId', 'userId'),
    reviewController.getAllReview,
  );

router
  .route('/:id')
  .get(restrictTo(), reviewController.getReview)
  .patch(restrictTo(USER), reviewController.updateReview)
  .delete(restrictTo(ADMIN), reviewController.deleteReview);
module.exports = router;
