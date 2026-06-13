const mongoose = require('mongoose');
const serverSchema = new mongoose.Schema(
  {
    // <creating-property-schema />
    lastChecked: {
      type: Date,
    },
    location: {
      type: String,
      required: [true, 'Please enter location'],
    },
    priceMonthly: {
      type: Number,
      required: [true, 'Please enter priceMonthly'],
    },
    price: {
      type: Number,
      required: [true, 'Please enter price'],
    },
    storage: {
      type: String,
      required: [true, 'Please enter storage'],
      validate: {
        validator: (el) => /(512 G|1 T|254 G|2 T)/.test(el),
        message: 'storage is not validate! , it most be like 1 T',
      },
    },
    cpu: {
      type: String,
      required: [true, 'Please enter cpu'],
    },
    ram: {
      type: Number,
      required: [true, 'Please enter ram'],
      min: 4,
      max: 256,
    },
    typeId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Type',
      required: [true, 'Please enter type'],
    },
    name: {
      type: String,
      required: [true, 'Please enter name'],
      unique: true,
    },
  },
  { timestamps: true, versionKey: false },
);
// <creating-function-schema />

serverSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'typeId',
    select: '-_id',
  });
  next();
});

const Server = mongoose.model('Server', serverSchema);
module.exports = Server;
