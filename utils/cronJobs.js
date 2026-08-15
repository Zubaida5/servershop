const cron = require('node-cron');
const Order = require('../models/orderModel');
const Server = require('../models/serverModel');
const Package = require('../models/packageModel');
const Message = require('../models/messageModel');

const checkExpiredRentals = async () => {
  try {
    const now = new Date();

    // جيب كل الأوردرات الـ active فيها إيجار
    const orders = await Order.find({
      status: 'active',
      'item.type': 'rent',
    });

    for (const order of orders) {
      for (const item of order.item) {
        if (item.type !== 'rent') continue;

        // احسب تاريخ انتهاء الإيجار
        const endDate = new Date(order.createdAt);
        endDate.setDate(endDate.getDate() + item.duration);

        const daysLeft = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));

        // إذا انتهى الإيجار
        if (daysLeft <= 0) {
          const pkg = await Package.findById(item.packageId);

          if (pkg) {
            const server = await Server.findById(pkg.serverId);

            if (server) {
              // رجّع الـ RAM والـ Storage للسيرفر
              server.usedRam = Math.max(0, server.usedRam - pkg.ram);
              server.usedStorage = Math.max(
                0,
                server.usedStorage - pkg.storage,
              );

              // إذا رجع في مساحة، خلي السيرفر والباقات متاحة
              if (!server.isAvailable) {
                server.isAvailable = true;
                await Package.updateMany(
                  { serverId: server._id },
                  { isAvailable: true },
                );
              }

              await server.save();
            }
          }

          // غير حالة الأوردر لـ completed
          order.status = 'completed';
          await order.save();

          console.log(`✅ Rental expired for order ${order._id}`);
        }

        // تنبيه قبل 3 أيام
        else if (daysLeft <= 3) {
          const pkg = await Package.findById(item.packageId);

          // تحقق إذا ما بعتنا تنبيه قبل
          const existingMessage = await Message.findOne({
            userId: order.userId,
            'body.orderId': order._id,
            title: 'تنبيه: إيجارك سينتهي قريباً',
          });

          if (!existingMessage) {
            await Message.create({
              title: 'تنبيه: إيجارك سينتهي قريباً',
              body: {
                orderId: order._id,
                packageName: pkg ? pkg.name : '',
                endDate,
                daysLeft,
              },
              userId: order.userId,
              isRead: false,
            });

            console.log(
              `📨 Reminder sent for order ${order._id}, ${daysLeft} days left`,
            );
          }
        }
      }
    }
  } catch (err) {
    console.error('❌ Cron job error:', err);
  }
};

const startCronJobs = () => {
  // يشتغل كل يوم الساعة 12 الليل
  cron.schedule('0 0 * * *', checkExpiredRentals);
  console.log('⏰ Cron jobs started');
};

module.exports = startCronJobs;
