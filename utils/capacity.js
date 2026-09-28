const Package = require('../models/packageModel');
const Server = require('../models/serverModel');

/*
 * إدارة سعة السيرفرات بمكان واحد.
 *
 * الحجز يتم عند إنشاء الطلب، والتحرير لازم يصير عند الإلغاء أو الرفض أو
 * انتهاء الإيجار. قبل هيك كان التحرير موجود فقط بمهمة انتهاء الإيجار،
 * فكل طلب ملغى كان يستهلك سعة السيرفر للأبد.
 */

// يعيد الـ RAM والتخزين للسيرفر ويرجّع الباقات للتوفر إذا صار في مساحة
const releasePackageCapacity = async (packageId) => {
  const pkg = await Package.findById(packageId);
  if (!pkg) return;

  const server = await Server.findById(pkg.serverId);
  if (!server) return;

  server.usedRam = Math.max(0, server.usedRam - pkg.ram);
  server.usedStorage = Math.max(0, server.usedStorage - pkg.storage);

  const hasRoom =
    server.usedRam < server.totalRam && server.usedStorage < server.totalStorage;

  if (hasRoom && !server.isAvailable) {
    server.isAvailable = true;
    await Package.updateMany({ serverId: server._id }, { isAvailable: true });
  }

  await server.save();
};

// يحرر سعة كل عناصر الطلب مرة واحدة فقط
const releaseOrderCapacity = async (order) => {
  if (!order || order.capacityReleased) return false;

  for (const item of order.item || []) {
    const packageId = item.packageId?._id || item.packageId;
    if (packageId) await releasePackageCapacity(packageId);
  }

  order.capacityReleased = true;

  return true;
};

// يحجز سعة باقة على سيرفرها ويقفل السيرفر إذا امتلأ
const reserveCapacity = async (server, pkg) => {
  server.usedRam += pkg.ram;
  server.usedStorage += pkg.storage;

  const isFull =
    server.usedRam >= server.totalRam ||
    server.usedStorage >= server.totalStorage;

  if (isFull) {
    server.isAvailable = false;
    await Package.updateMany({ serverId: server._id }, { isAvailable: false });
  }

  await server.save();
};

module.exports = {
  releasePackageCapacity,
  releaseOrderCapacity,
  reserveCapacity,
};
