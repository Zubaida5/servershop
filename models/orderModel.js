const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema(
  {
    // <creating-property-schema />
    methodPayment: {
      type: String,
      required: [true, 'Please enter methodPayment'],
      unique: true,
    },
    item: [
      {
        // <creating-property-object-item />
        price: {
          type: Number,
          required: [true, 'Please enter price'],
        },
        duration: {
          type: Number,
          required: [true, 'Please enter duration'],
        },
        serverId: {
          type: mongoose.Schema.ObjectId,
          ref: 'Server',
          required: [true, 'Please enter server'],
        },
      },
    ],
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Please enter user'],
    },
    status: {
      type: String,
      required: [true, 'Please enter status'],
    },
  },
  { timestamps: true, versionKey: false },
);
// <creating-function-schema />

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'item.serverId',
    select: '-_id',
  });
  next();
});

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'userId',
    select: '-_id',
  });
  next();
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
