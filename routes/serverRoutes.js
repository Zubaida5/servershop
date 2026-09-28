const serverController = require('../controllers/serverController');
const { protect, restrictTo } = require('./../middlewares/authMiddlewers');
const { RoleCode } = require('./../utils/enum');
const { USER, ADMIN } = RoleCode;
const express = require('express');
const router = express.Router();

// المسارات العامة المتاحة للجميع
router.route('/').get(serverController.getAllServer);
router.route('/:id').get(serverController.getServer);
router.use(protect);
router
  .route('/')

  .post(restrictTo(ADMIN), serverController.createServer);

router.route('/mine').get(restrictTo(USER), serverController.getMyPackages);
router
  .route('/memory-by-type')
  .get(restrictTo(ADMIN), serverController.getMemoryByType);

router
  .route('/:id/status')
  .patch(restrictTo(ADMIN), serverController.updateServerStatus);

router.route('/:id').patch(restrictTo(ADMIN), serverController.updateServer);

module.exports = router;
