const packageController = require('../controllers/packageController');
const { protect, restrictTo } = require('../middlewares/authMiddlewers');
const { RoleCode } = require('../utils/enum');
const { USER, ADMIN } = RoleCode;
const express = require('express');
const router = express.Router();
// المسارات العامة (متاحة للجميع دون تسجيل دخول)
router.route('/').get(packageController.getAllPackage);
router.route('/:id').get(packageController.getPackage);

router.use(protect);
router.route('/').post(restrictTo(ADMIN), packageController.createPackage);

router
  .route('/auto-fix-categories')
  .patch(restrictTo(ADMIN), packageController.autoFixCategories);

router
  .route('/:id')
  .patch(restrictTo(ADMIN), packageController.updatePackage)
  .delete(restrictTo(ADMIN), packageController.deletePackage);

module.exports = router;
