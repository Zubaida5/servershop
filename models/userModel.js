const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { RoleCode } = require('../utils/enum');
const userSchema = new mongoose.Schema(
  {
    // <creating-property-schema />
    name: {
      type: String,
      required: [true, 'Please tell us your name!'],
      trim: true,
      validate: {
        validator: function (name) {
          return /^[a-zA-Z\u0600-\u06FF\s]+$/.test(name);
        },
        message: 'Name must contain only letters',
      },
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    photo: {
      type: String,
      default: 'default.jpg',
    },
    role: {
      type: String,
      enum: Object.values(RoleCode),
      default: 'USER',
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { versionKey: false },
);
// <creating-function-schema />

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    return JWTTimestamp < changedTimestamp;
  }
  // False means NOT changed
  return false;
};
userSchema.methods.createPasswordResetToken = function () {
  // كود OTP من 6 أرقام بدل الـ token الطويل
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(otp)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // صالح 10 دقايق

  return otp; // هاد يلي رح ينبعت بالإيميل (مو مشفر)
};
const User = mongoose.model('User', userSchema);
module.exports = User;
