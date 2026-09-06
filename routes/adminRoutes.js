const express = require('express');
const router = express.Router();
const adminConsoleController = require('../controllers/analyticsController');
const { protect, restrictTo } = require('../controllers/authController');
const authMiddlewers = require('../middlewares/authMiddlewers');

// حماية المسار وجعله مخصصاً للـ ADMIN فقط
router.get(
  '/global-analytics',
  authMiddlewers.protect,
  authMiddlewers.isactive,
  authMiddlewers.restrictTo('ADMIN'),
  adminConsoleController.getGlobalAnalytics,
);
module.exports = router;
