const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema(
  {
    // <creating-property-schema />
    status: {
      type: String,
      required: [true, 'Please enter status'],
    },
  },
  { timestamps: true, versionKey: false },
);
// <creating-function-schema />

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
