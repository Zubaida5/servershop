const Order = require('../models/orderModel');
const AppError = require('../utils/appError');
const handlerFactory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');
exports.getOrder = handlerFactory.getOne(Order);
exports.createOrder = catchAsync(async (req, res, next) => {
  const order = await Order.create({
    ...req.body,
    status: 'pending', // دايماً يبدأ بـ pending
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
exports.updateOrderStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;

  // تأكد الستاتوس من القيم المسموحة
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
