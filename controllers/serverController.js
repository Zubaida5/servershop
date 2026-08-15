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

exports.updateServer = catchAsync(async (req, res, next) => {
  const server = await Server.findById(req.params.id);

  if (!server) {
    return next(new AppError('No server found with this ID', 404));
  }

  const newTotalRam = req.body.totalRam ?? server.totalRam;
  const newTotalStorage = req.body.totalStorage ?? server.totalStorage;

  if (newTotalRam < server.usedRam) {
    return next(
      new AppError(
        `totalRam (${newTotalRam} GB) لا يمكن أن يكون أصغر من usedRam (${server.usedRam} GB)`,
        400,
      ),
    );
  }

  if (newTotalStorage < server.usedStorage) {
    return next(
      new AppError(
        `totalStorage (${newTotalStorage} GB) لا يمكن أن يكون أصغر من usedStorage (${server.usedStorage} GB)`,
        400,
      ),
    );
  }

  // إذا الأدمن بدو يحط maintenance، لازم يحط maintenanceEndTime
  if (req.body.status === 'maintenance' && !req.body.maintenanceEndTime) {
    return next(
      new AppError('لازم تحدد وقت انتهاء الصيانة (maintenanceEndTime)', 400),
    );
  }

  // إذا الأدمن بدو يرجع السيرفر online أو offline، نشيل maintenanceEndTime
  if (req.body.status === 'online' || req.body.status === 'offline') {
    req.body.maintenanceEndTime = null;
  }

  const updatedServer = await Server.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true },
  );

  res.status(200).json({
    status: 'success',
    data: { doc: updatedServer },
  });
});

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
