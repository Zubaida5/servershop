const mongoose = require('mongoose');
const serverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter name'],
      unique: true,
    },
    status: {
      type: String,
      enum: ['online', 'offline', 'maintenance'],
      default: 'online',
    },
    maintenanceEndTime: {
      type: Date,
    },
    location: {
      type: String,
      required: [true, 'Please enter location'],
      enum: ['Aleppo', 'Damascus', 'Lattakia'],
    },
    cpu: {
      type: String,
      required: [true, 'Please enter cpu'],
      enum: [
        'Intel Xeon E-2334',
        'Intel Xeon E-2388G',
        'AMD EPYC 7302',
        'AMD EPYC 7402',
        'Intel Xeon Gold 6226R',
      ],
    },
    totalRam: {
      type: Number,
      required: true,
    },
    usedRam: {
      type: Number,
      default: 0,
    },

    totalStorage: {
      type: Number,
      required: true,
    },
    usedStorage: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['online', 'offline', 'maintenance'],
      default: 'online',
    },
    typeId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Type',
      required: [true, 'Please enter type'],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    lastChecked: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true, versionKey: false },
);

serverSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'typeId',
    select: '-_id',
  });
  next();
});

const Server = mongoose.model('Server', serverSchema);
module.exports = Server;
