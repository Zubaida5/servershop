// controllers/analyticsController.js
const Order = require('../models/orderModel');
const User = require('../models/userModel');
const Server = require('../models/serverModel');

exports.getGlobalAnalytics = async (req, res) => {
  try {
    // 1. إجمالي المستخدمين والعملاء النشطين
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ active: true });

    // 2. إجمالي السيرفرات النشطة
    const totalServers = await Server.countDocuments({ isAvailable: true });

    // 3. حساب المبيعات والإيرادات الكلية والطلبات
    const orderStats = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          completedOrders: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] },
          },

          pendingOrders: {
            $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] },
          },

          totalRevenue: {
            $sum: {
              $cond: [
                { $eq: ['$status', 'completed'] },
                {
                  $sum: {
                    $map: {
                      input: '$item',
                      as: 'orderItem',
                      in: { $ifNull: ['$$orderItem.price', 0] },
                    },
                  },
                },
                0,
              ],
            },
          },
        },
      },
    ]);

    const stats = orderStats[0] || {
      totalOrders: 0,
      completedOrders: 0,
      pendingOrders: 0,
      totalRevenue: 0,
    };

    res.status(200).json({
      status: 'success',
      data: {
        totalUsers,
        activeUsers,
        totalServers,
        totalOrders: stats.totalOrders || 0,
        completedOrders: stats.completedOrders || 0,
        pendingOrders: stats.pendingOrders || 0,
        totalRevenue: stats.totalRevenue || 0,
      },
    });
  } catch (error) {
    console.error('GLOBAL ANALYTICS ERROR:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};
