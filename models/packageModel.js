const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter name'],
      unique: true,
    },
    ram: {
      type: Number,
      required: [true, 'Please enter ram'],
      enum: [4, 8, 16, 32, 64, 128, 256],
    },
   
    storage: {
      type: Number,
      required: [true, 'Please enter storage'],
    },
    cpu: {
      type: String,
      required: [true, 'Please enter cpu'],
    },
    price: {
      type: Number,
      required: [true, 'Please enter price'],
    },
    priceMonthly: {
      type: Number,
      required: [true, 'Please enter priceMonthly'],
    },
    serverId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Server',
      required: [true, 'Please enter server'],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false },
);



const Package = mongoose.model('Package', packageSchema);
module.exports = Package;
