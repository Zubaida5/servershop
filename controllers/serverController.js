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
exports.getMyServers = catchAsync(async (req, res, next) => {
  // 1. جيب كل أوردرات اليوزر
  const orders = await Order.find({ userId: req.user.id });

  // 2. استخرج الـ serverIds من كل الأوردرات
  const serverIds = orders.flatMap((order) =>
    order.item.map((i) => i.serverId),
  );

  // 3. جيب السيرفرات
  const servers = await Server.find({ _id: { $in: serverIds } });

  res.status(200).json({
    status: 'success',
    results: servers.length,
    data: { servers },
  });
});
