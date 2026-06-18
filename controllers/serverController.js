const Server = require('../models/serverModel');
const Order = require('../models/orderModel');
const Package = require('../models/packageModel');
const AppError = require('../utils/appError');
const handlerFactory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.getServer = handlerFactory.getOne(Server);
exports.createServer = handlerFactory.createOne(Server);
exports.updateServer = handlerFactory.updateOne(Server);
exports.deleteServer = handlerFactory.deleteOne(Server);
exports.getAllServer = handlerFactory.getAll(Server);

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
