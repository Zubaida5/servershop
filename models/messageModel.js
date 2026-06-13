const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema(
  {
    // <creating-property-schema />
    body: {
      // <creating-property-object-body />
    },
    title: {
      type: String,
      required: [true, 'Please enter title'],
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Please enter user'],
    },
    isRead: {
      type: Boolean,
    },
  },
  { timestamps: true, versionKey: false },
);
// <creating-function-schema />

messageSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'userId',
    select: '-_id',
  });
  next();
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
