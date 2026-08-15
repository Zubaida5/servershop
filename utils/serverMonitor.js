const cron = require('node-cron');
const Server = require('../models/serverModel');

const checkServers = async () => {
  try {
    const servers = await Server.find({});

    for (const server of servers) {
      // إذا كان تحت الصيانة
      if (server.status === 'maintenance') {
        // إذا خلص وقت الصيانة، رجّعه online
        if (
          server.maintenanceEndTime &&
          new Date() >= server.maintenanceEndTime
        ) {
          await Server.findByIdAndUpdate(server._id, {
            status: 'online',
            maintenanceEndTime: null,
            lastChecked: new Date(),
          });
          console.log(
            `✅ Server ${server.name} maintenance ended, back online`,
          );
        }
        // إذا لسا ما خلص وقت الصيانة، ما نلمسه
        continue;
      }

      // إذا online أو offline ← نغير عشوائياً
      const isOnline = Math.random() > 0.2; // 80% احتمال يكون online
      await Server.findByIdAndUpdate(server._id, {
        status: isOnline ? 'online' : 'offline',
        lastChecked: new Date(),
      });
    }

    console.log(
      `✅ Server check completed at ${new Date().toLocaleTimeString()}`,
    );
  } catch (err) {
    console.error('❌ Server monitoring error:', err);
  }
};

const startMonitoring = () => {
  cron.schedule('*/5 * * * *', checkServers);
  console.log('🔍 Server monitoring started');
};

module.exports = startMonitoring;
