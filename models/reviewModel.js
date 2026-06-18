const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema(
  {
    // <creating-property-schema />
    comment: {
      type: String,
      required: [true, 'Please enter comment'],
    },
    rate: {
      type: Number,
      required: [true, 'Please enter rate'],
      min: [1, 'Rate must be at least 1'],
      max: [5, 'Rate must be at most 5'],
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Please enter user'],
    },
  },
  { timestamps: true, versionKey: false },
);
// <creating-function-schema />

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'userId',
    select: '-_id',
  });
  next();
});
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
