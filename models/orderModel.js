const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema(
  {
    methodPayment: {
      type: String,
      required: [true, 'Please enter methodPayment'],
      enum: ['credit_card', 'shamCash'],
    },
    item: [
      {
        type: {
          type: String,
          enum: ['buy', 'rent'],
          required: true,
        },
        price: {
          type: Number,
          required: [true, 'Please enter price'],
        },
        duration: {
          type: Number,
          required: function () {
            return this.type === 'rent';
          },
        },
        packageId: {
          type: mongoose.Schema.ObjectId,
          ref: 'Package',
          required: [true, 'Please enter package'],
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
      enum: ['pending', 'active', 'completed', 'cancelled', 'rejected'],
    },
  },
  { timestamps: true, versionKey: false },
);

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'item.packageId',
    select: '-__v',
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
