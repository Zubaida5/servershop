const packageController = require('../controllers/packageController');
const { protect, restrictTo } = require('../middlewares/authMiddlewers');
const { RoleCode } = require('../utils/enum');
const { USER, ADMIN } = RoleCode;
const express = require('express');
const router = express.Router();
router.use(protect);
router
  .route('/')
  .get(restrictTo(USER, ADMIN), packageController.getAllpackage)
  .post(restrictTo(ADMIN), packageController.createpackage);
router
  .route('/:id')
  .get(restrictTo(USER, ADMIN), packageController.getpackage)
  .patch(restrictTo(ADMIN), packageController.updatepackage)
  .delete(restrictTo(ADMIN), packageController.deletepackage);
module.exports = router;
