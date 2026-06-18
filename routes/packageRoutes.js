const packageController = require('../controllers/packageController');
const { protect, restrictTo } = require('../middlewares/authMiddlewers');
const { RoleCode } = require('../utils/enum');
const { USER, ADMIN } = RoleCode;
const express = require('express');
const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(restrictTo(USER, ADMIN), packageController.getAllPackage)
  .post(restrictTo(ADMIN), packageController.createPackage);

router
  .route('/:id')
  .get(restrictTo(USER, ADMIN), packageController.getPackage)
  .patch(restrictTo(ADMIN), packageController.updatePackage)
  .delete(restrictTo(ADMIN), packageController.deletePackage);

module.exports = router;
