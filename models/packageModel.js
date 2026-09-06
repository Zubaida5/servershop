const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter name'],
      unique: true,
    },
    category: {
      type: String,
      enum: ['economic', 'medium', 'large', 'professional'],
      required: [true, 'Please enter category'],
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
      min: [0, 'Price cannot be negative'],
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
    durationType: {
      type: String,
      enum: ['monthly', 'yearly', 'purchase'],
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);



const Package = mongoose.model('Package', packageSchema);
module.exports = Package;
