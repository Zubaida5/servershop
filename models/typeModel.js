const mongoose = require('mongoose');
const typeSchema = new mongoose.Schema(
  {
    // <creating-property-schema />
    description: {
      type: String,
      required: [true, 'Please enter description'],
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

const Type = mongoose.model('Type', typeSchema);
module.exports = Type;
