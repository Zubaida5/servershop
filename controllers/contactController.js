const Contact = require('../models/contactModel');
const handlerFactory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.createContact = catchAsync(async (req, res, next) => {
  const contact = await Contact.create({
    email: req.user.email,
    message: req.body.message,
    userId: req.user.id,
  });

  res.status(201).json({
    status: 'success',
    data: { contact },
  });
});
exports.getMyContacts = catchAsync(async (req, res, next) => {
  const contacts = await Contact.find({ userId: req.user.id });

  res.status(200).json({
    status: 'success',
    results: contacts.length,
    data: { contacts },
  });
});

exports.getAllContact = handlerFactory.getAll(Contact);
exports.deleteContact = handlerFactory.deleteOne(Contact);
