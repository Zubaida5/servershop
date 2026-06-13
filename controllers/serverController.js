const Server = require('../models/serverModel');
const AppError = require('../utils/appError');
const handlerFactory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');
exports.getServer = catchAsync((req, res, next) => {});

exports.getServer = handlerFactory.getOne(Server);
exports.createServer = handlerFactory.createOne(Server);
exports.updateServer = handlerFactory.updateOne(Server);
exports.deleteServer = handlerFactory.deleteOne(Server);
exports.getAllServer = handlerFactory.getAll(Server);
