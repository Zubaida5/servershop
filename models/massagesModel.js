const mongoose = require('mongoose');
const massagesSchema = new mongoose.Schema(
  {
    // <creating-property-schema />
  },
  { timestamps: true, versionKey: false },
);
// <creating-function-schema />
const Massages = mongoose.model('Massages', massagesSchema);
module.exports = Massages;
