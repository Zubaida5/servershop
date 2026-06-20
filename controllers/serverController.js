const Server = require('../models/serverModel');
const Order = require('../models/orderModel');
const Package = require('../models/packageModel');
const AppError = require('../utils/appError');
const handlerFactory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');

const hiddenFields = '-usedRam -usedStorage -isAvailable -lastChecked';

exports.getServer = catchAsync(async (req, res, next) => {
  let query = Server.findById(req.params.id);

  if (req.user.role !== 'ADMIN') {
    query = query.select(hiddenFields);
  }

  const server = await query;

  if (!server) {
    return next(new AppError('No server found with this ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { doc: server },
  });
});

exports.createServer = handlerFactory.createOne(Server);
exports.updateServer = handlerFactory.updateOne(Server);
exports.deleteServer = handlerFactory.deleteOne(Server);

exports.getAllServer = catchAsync(async (req, res, next) => {
  let query = Server.find();

  if (req.user.role !== 'ADMIN') {
    query = query.select(hiddenFields);
  }

  const servers = await query;

  res.status(200).json({
    status: 'success',
    results: servers.length,
    data: { doc: servers },
  });
});

exports.getMyPackages = catchAsync(async (req, res, next) => {
  const orders = await Order.find({
    userId: req.user.id,
    status: { $in: ['active', 'completed', 'pending'] },
  }).lean();

  const packageIds = orders.flatMap((order) =>
    order.item.map((i) => i.packageId._id || i.packageId),
  );

  const packages = await Package.find({ _id: { $in: packageIds } });

  res.status(200).json({
    status: 'success',
    results: packages.length,
    data: { packages },
  });
});
