const typeController = require('../controllers/typeController');
const { protect, restrictTo } = require('./../middlewares/authMiddlewers');
const { RoleCode } = require('./../utils/enum');
const { USER, ADMIN } = RoleCode;
const express = require('express');
const router = express.Router();
router.use(protect);
router
  .route('/')
  .get(restrictTo(USER, ADMIN), typeController.getAllType)
  .post(restrictTo(ADMIN), typeController.createType);
router
  .route('/:id')
  .get(restrictTo(USER, ADMIN), typeController.getType)
  .patch(restrictTo(ADMIN), typeController.updateType)
  .delete(restrictTo(ADMIN), typeController.deleteType);
module.exports = router;
