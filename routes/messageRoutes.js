const messageController = require('../controllers/messageController');
const { addQuery } = require('../middlewares/dynamicMiddleware');
const { protect, restrictTo } = require('./../middlewares/authMiddlewers');
const { RoleCode } = require('./../utils/enum');
const { USER, ADMIN } = RoleCode;
const express = require('express');
const router = express.Router();
router.use(protect);
router
  .route('/mine')
  .get(
    restrictTo(USER),
    addQuery('userId', 'userId'),
    messageController.getAllMessage,
  );
router
  .route('/:id')
  .get(restrictTo(), messageController.getMessage)
  .patch(restrictTo(USER, ADMIN), messageController.updateMessage)
  .delete(restrictTo(), messageController.deleteMessage);
module.exports = router;
