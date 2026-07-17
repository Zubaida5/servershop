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
  .get( reviewController.getAllReview)
  .post(
    restrictTo(USER),
    addVarBody('userId', 'userId'),
    reviewController.createReview,
  );
module.exports = router;
