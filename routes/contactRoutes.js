const contactController = require('../controllers/contactController');
const { protect, restrictTo } = require('../middlewares/authMiddlewers');
const { RoleCode } = require('../utils/enum');
const { USER, ADMIN } = RoleCode;
const express = require('express');
const router = express.Router();

router.use(protect);

router
  .route('/')
  .post(restrictTo(USER), contactController.createContact)
  .get(restrictTo(ADMIN), contactController.getAllContact);
  router.route('/mine').get(restrictTo(USER), contactController.getMyContacts);

router.route('/:id').delete(restrictTo(ADMIN), contactController.deleteContact);

module.exports = router;
