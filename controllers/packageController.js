const Package = require('../models/packageModel');
const Server = require('../models/serverModel');
const AppError = require('../utils/appError');
const handlerFactory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.createPackage = catchAsync(async (req, res, next) => {
  const server = await Server.findById(req.body.serverId);

  if (!server) {
    return next(new AppError('No server found with this ID', 404));
  }

  const pkg = await Package.create({
    ...req.body,
    cpu: server.cpu,
  });

  res.status(201).json({
    status: 'success',
    data: { doc: pkg },
  });
});

exports.updatePackage = handlerFactory.updateOne(Package);
exports.deletePackage = handlerFactory.deleteOne(Package);

exports.getPackage = catchAsync(async (req, res, next) => {
  let query = Package.findById(req.params.id);

  if (req.user.role === 'ADMIN') {
    query = query.populate({ path: 'serverId', select: '-__v' });
  }

  const pkg = await query;

  if (!pkg) {
    return next(new AppError('No package found with this ID', 404));
  }

  // اليوزر ما يشوف باقة غير متاحة
  if (req.user.role !== 'ADMIN' && !pkg.isAvailable) {
    return next(new AppError('No package found with this ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { doc: pkg },
  });
});

exports.getAllPackage = catchAsync(async (req, res, next) => {
  const isAdmin = req.user.role === 'ADMIN';
  const filter = isAdmin ? {} : { isAvailable: true };

  // فلتر حسب نوع السيرفر
  if (req.query.type) {
    const Type = require('../models/typeModel');
    const type = await Type.findOne({ name: req.query.type });

    if (!type) {
      return next(new AppError('No type found with this name', 404));
    }

    const servers = await Server.find({ typeId: type._id });
    const serverIds = servers.map((s) => s._id);

    filter.serverId = { $in: serverIds };
  }

  // فلتر حسب serverId
  if (req.query.serverId) {
    filter.serverId = req.query.serverId;
  }

  let query = Package.find(filter);

  if (isAdmin) {
    query = query.populate({ path: 'serverId', select: '-__v' });
  }

  const packages = await query;

  res.status(200).json({
    status: 'success',
    results: packages.length,
    data: { doc: packages },
  });
});