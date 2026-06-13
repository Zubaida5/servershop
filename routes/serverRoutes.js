const serverController = require('../controllers/serverController');
const { protect, restrictTo } = require('./../middlewares/authMiddlewers');
const { RoleCode } = require('./../utils/enum');
const { USER, ADMIN } = RoleCode;
const express = require('express');
const router = express.Router();
router.use(protect);
router
  .route('/')
  .get(restrictTo(USER, ADMIN), serverController.getAllServer)
  .post(restrictTo(ADMIN), serverController.createServer);
router
  .route('/mine')
  .get(restrictTo(USER, ADMIN), serverController.getAllServer);
router
  .route('/:id')
  .get(restrictTo(USER, ADMIN), serverController.getServer)
  .patch(restrictTo(ADMIN), serverController.updateServer)
  .delete(restrictTo(ADMIN), serverController.deleteServer);
module.exports = router;
