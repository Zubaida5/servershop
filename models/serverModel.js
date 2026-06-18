const mongoose = require('mongoose');
const serverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter name'],
      unique: true,
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
      required: [true, 'Please enter totalRam'],
      enum: [4, 8, 16, 32, 64, 128, 256],
    },
    usedRam: {
      type: Number,
      default: 0,
    },
    totalStorage: {
      type: String,
      required: [true, 'Please enter totalStorage'],
      enum: ['256 GB', '512 GB', '1 TB', '2 TB', '4 TB'],
    },
    usedStorage: {
      type: Number,
      default: 0,
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
