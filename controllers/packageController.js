const Package = require('../models/packageModel');
const AppError = require('../utils/appError');
const handlerFactory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.createPackage = handlerFactory.createOne(Package);
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

  res.status(200).json({
    status: 'success',
    data: { doc: pkg },
  });
});

exports.getAllPackage = catchAsync(async (req, res, next) => {
  let query = Package.find();

  if (req.user.role === 'ADMIN') {
    query = query.populate({ path: 'serverId', select: '-__v' });
  }

  const packages = await query;

  res.status(200).json({
    status: 'success',
    results: packages.length,
    data: { doc: packages },
  });
});
