const Package = require('../models/packageModel');
const AppError = require('../utils/appError');
const handlerFactory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.getPackage = handlerFactory.getOne(Package);
exports.createPackage = handlerFactory.createOne(Package);
exports.updatePackage = handlerFactory.updateOne(Package);
exports.deletePackage = handlerFactory.deleteOne(Package);
exports.getAllPackage = handlerFactory.getAll(Package);
