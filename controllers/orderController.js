const Order = require('../models/orderModel');
const Package = require('../models/packageModel');
const Server = require('../models/serverModel');
const Message = require('../models/messageModel');
const AppError = require('../utils/appError');
const handlerFactory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.getOrder = handlerFactory.getOne(Order);

exports.createOrder = catchAsync(async (req, res, next) => {
  for (const orderItem of req.body.item) {
    const pkg = await Package.findById(orderItem.packageId);

    if (!pkg) {
      return next(new AppError('Package not found', 404));
    }

    if (!pkg.isAvailable) {
      return next(
        new AppError(`Package "${pkg.name}" is no longer available`, 400),
      );
    }

    const server = await Server.findById(pkg.serverId._id || pkg.serverId);

    if (!server) {
      return next(new AppError('Server not found', 404));
    }

    const remainingRam = server.totalRam - server.usedRam;
    if (remainingRam < pkg.ram) {
      return next(
        new AppError(
          `Not enough RAM available on the server for package "${pkg.name}"`,
          400,
        ),
      );
    }

    const remainingStorage = server.totalStorage - server.usedStorage;
    if (remainingStorage < pkg.storage) {
      return next(
        new AppError(
          `Not enough storage available on the server for package "${pkg.name}"`,
          400,
        ),
      );
    }

    server.usedRam += pkg.ram;
    server.usedStorage += pkg.storage;

    if (server.usedRam >= server.totalRam) {
      server.isAvailable = false;
      await Package.updateMany(
        { serverId: server._id },
        { isAvailable: false },
      );
    }

    await server.save();
  }

  const order = await Order.create({
    ...req.body,
    status: 'pending',
  });

  res.status(201).json({
    status: 'success',
    data: { order },
  });
});

exports.getMyOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ userId: req.user.id });

  res.status(200).json({
    status: 'success',
    results: orders.length,
    data: { orders },
  });
});

exports.getMyStats = catchAsync(async (req, res, next) => {
  const orders = await Order.find({
    userId: req.user.id,
    status: { $in: ['active', 'completed', 'pending'] },
  });

  const bought = [];
  const rented = [];

  orders.forEach((order) => {
    order.item.forEach((item) => {
      if (item.type === 'buy') {
        bought.push(item.packageId);
      } else if (item.type === 'rent') {
        const endDate = new Date(order.createdAt);
        endDate.setDate(endDate.getDate() + item.duration);
        const daysLeft = Math.ceil(
          (endDate - new Date()) / (1000 * 60 * 60 * 24),
        );
        rented.push({
          package: item.packageId,
          startDate: order.createdAt,
          endDate,
          daysLeft,
        });
      }
    });
  });

  res.status(200).json({
    status: 'success',
    data: {
      totalBought: bought.length,
      totalRented: rented.length,
      boughtPackages: bought,
      rentedPackages: rented,
    },
  });
});

exports.updateOrderStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;

  const allowedStatus = [
    'pending',
    'active',
    'completed',
    'cancelled',
    'rejected',
  ];
  if (!allowedStatus.includes(status)) {
    return next(new AppError('Invalid status value', 400));
  }

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true },
  );

  if (!order) return next(new AppError('No order found with this ID', 404));

  // إذا صار الأوردر active، بعت Message لليوزر
  if (status === 'active') {
    await Message.create({
      title: 'تم تفعيل طلبك',
      body: {
        orderId: order._id,
      },
      userId: order.userId,
      isRead: false,
    });
  }

  res.status(200).json({
    status: 'success',
    data: { order },
  });
});

exports.deleteOrder = handlerFactory.deleteOne(Order);

exports.getAllOrder = catchAsync(async (req, res, next) => {
  const filter = req.user.role === 'USER' ? { userId: req.user.id } : {};

  const orders = await Order.find(filter);

  res.status(200).json({
    status: 'success',
    results: orders.length,
    data: { orders },
  });
});
exports.getMyInvoices = catchAsync(async (req, res, next) => {
  const orders = await Order.find({
    userId: req.user.id,
    status: { $in: ['active', 'completed'] },
  });

  res.status(200).json({
    status: 'success',
    results: orders.length,
    data: { orders },
  });
});
exports.cancelOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findOne({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!order) {
    return next(new AppError('No order found with this ID', 404));
  }

  if (order.status !== 'pending') {
    return next(
      new AppError('You can only cancel orders that are still pending', 400),
    );
  }

  order.status = 'cancelled';
  await order.save();

  res.status(200).json({
    status: 'success',
    data: { order },
  });
});
