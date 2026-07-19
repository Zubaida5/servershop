const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please enter email'],
    },
    message: {
      type: String,
      required: [true, 'Please enter message'],
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Please enter user'],
    },
  },
  { timestamps: true, versionKey: false },
);

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
