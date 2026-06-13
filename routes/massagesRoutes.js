const massagesController = require('../controllers/massagesController');
const { protect, restrictTo } = require('./../middlewares/authMiddlewers');
const { RoleCode } = require('./../utils/enum');
const { USER, ADMIN } = RoleCode;
const express = require('express');
const router = express.Router();
router.use(protect);
router
  .route('/')
  .get(restrictTo(USER, ADMIN), massagesController.getAllMassages)
  .post(restrictTo(ADMIN), massagesController.createMassages);
router
  .route('/:id')
  .get(restrictTo(USER, ADMIN), massagesController.getMassages)
  .patch(restrictTo(ADMIN), massagesController.updateMassages)
  .delete(restrictTo(ADMIN), massagesController.deleteMassages);
module.exports = router;
