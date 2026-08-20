const mongoose = require('mongoose');

const DB = 'mongodb://127.0.0.1:27017/servershopDb';
const ADMIN_ID = new mongoose.Types.ObjectId('6a80adbe25cb26b4a1705362');

// ========== Schemas ==========

const typeSchema = new mongoose.Schema(
  { name: String, description: String },
  { timestamps: true, versionKey: false },
);
const Type = mongoose.model('Type', typeSchema);

const serverSchema = new mongoose.Schema(
  {
    name: String,
    location: String,
    cpu: String,
    totalRam: Number,
    usedRam: { type: Number, default: 0 },
    totalStorage: Number,
    usedStorage: { type: Number, default: 0 },
    isAvailable: { type: Boolean, default: true },
    status: { type: String, default: 'online' },
    lastChecked: Date,
    typeId: { type: mongoose.Schema.ObjectId, ref: 'Type' },
  },
  { timestamps: true, versionKey: false },
);
const Server = mongoose.model('Server', serverSchema);

const packageSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    ram: Number,
    storage: Number,
    cpu: String,
    price: Number,
    durationType: String,
    serverId: { type: mongoose.Schema.ObjectId, ref: 'Server' },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false },
);
const Package = mongoose.model('Package', packageSchema);

const reviewSchema = new mongoose.Schema(
  {
    comment: String,
    rate: Number,
    userId: { type: mongoose.Schema.ObjectId, ref: 'User' },
  },
  { timestamps: true, versionKey: false },
);
const Review = mongoose.model('Review', reviewSchema);

const orderSchema = new mongoose.Schema(
  {
    methodPayment: String,
    paymentNumber: String,
    paymentImage: String,
    status: String,
    userId: { type: mongoose.Schema.ObjectId, ref: 'User' },
    item: [
      {
        type: { type: String },
        price: Number,
        duration: Number,
        packageId: { type: mongoose.Schema.ObjectId, ref: 'Package' },
      },
    ],
  },
  { timestamps: true, versionKey: false },
);
const Order = mongoose.model('Order', orderSchema);

const messageSchema = new mongoose.Schema(
  {
    title: String,
    body: mongoose.Schema.Types.Mixed,
    isRead: Boolean,
    userId: { type: mongoose.Schema.ObjectId, ref: 'User' },
  },
  { timestamps: true, versionKey: false },
);
const Message = mongoose.model('Message', messageSchema);

// ========== Seed ==========

async function seed() {
  await mongoose.connect(DB);
  console.log('✅ Connected to MongoDB');

  const collectionsToDrop = ['types', 'servers', 'packages', 'reviews', 'orders', 'messages'];
  const existingCollections = (await mongoose.connection.db.listCollections().toArray()).map((c) => c.name);

  await Promise.all(
    collectionsToDrop
      .filter((name) => existingCollections.includes(name))
      .map((name) => mongoose.connection.db.dropCollection(name)),
  );
  console.log('🗑️  Cleared old data (collections + indexes dropped)');

  // Types
  const types = await Type.insertMany([
    { name: 'VPS', description: 'Virtual Private Server with SSD storage, guaranteed resources and high flexibility' },
    { name: 'VPS-NVMe', description: 'Virtual Private Server with ultra-fast NVMe storage, slightly higher prices' },
    { name: 'Cloud', description: 'Flexible cloud environment that distributes data across multiple servers to ensure uptime' },
    { name: 'Windows', description: 'Windows Server-based servers, dedicated for developers who need a Microsoft work environment' },
  ]);
  console.log('✅ Types inserted');

  // Servers
  const servers = await Server.insertMany([
    {
      name: 'VPS-Server-01',
      location: 'Damascus',
      cpu: 'Intel Xeon E-2388G',
      totalRam: 256,
      usedRam: 0,
      totalStorage: 4096,
      usedStorage: 0,
      isAvailable: true,
      status: 'online',
      lastChecked: new Date(),
      typeId: types[0]._id,
    },
    {
      name: 'NVMe-Server-01',
      location: 'Aleppo',
      cpu: 'AMD EPYC 7402',
      totalRam: 256,
      usedRam: 0,
      totalStorage: 4096,
      usedStorage: 0,
      isAvailable: true,
      status: 'online',
      lastChecked: new Date(),
      typeId: types[1]._id,
    },
    {
      name: 'Cloud-Server-01',
      location: 'Lattakia',
      cpu: 'Intel Xeon Gold 6226R',
      totalRam: 512,
      usedRam: 0,
      totalStorage: 4096,
      usedStorage: 0,
      isAvailable: true,
      status: 'online',
      lastChecked: new Date(),
      typeId: types[2]._id,
    },
    {
      name: 'Windows-Server-01',
      location: 'Damascus',
      cpu: 'Intel Xeon E-2334',
      totalRam: 256,
      usedRam: 0,
      totalStorage: 2048,
      usedStorage: 0,
      isAvailable: true,
      status: 'online',
      lastChecked: new Date(),
      typeId: types[3]._id,
    },
  ]);
  console.log('✅ Servers inserted');

  // Packages
  const packages = await Package.insertMany([
    // ===== VPS - Monthly =====
    { name: 'VPS Starter', category: 'economic', ram: 2, storage: 256, cpu: 'Intel Xeon E-2388G', price: 8, durationType: 'monthly', serverId: servers[0]._id, isAvailable: true },
    { name: 'VPS Standard', category: 'medium', ram: 4, storage: 512, cpu: 'Intel Xeon E-2388G', price: 14, durationType: 'monthly', serverId: servers[0]._id, isAvailable: true },
    { name: 'VPS Advanced', category: 'large', ram: 8, storage: 512, cpu: 'Intel Xeon E-2388G', price: 25, durationType: 'monthly', serverId: servers[0]._id, isAvailable: true },
    { name: 'VPS Professional', category: 'professional', ram: 16, storage: 1024, cpu: 'Intel Xeon E-2388G', price: 45, durationType: 'monthly', serverId: servers[0]._id, isAvailable: true },
    // ===== VPS - Yearly =====
    { name: 'VPS Starter', category: 'economic', ram: 2, storage: 256, cpu: 'Intel Xeon E-2388G', price: 80, durationType: 'yearly', serverId: servers[0]._id, isAvailable: true },
    { name: 'VPS Standard', category: 'medium', ram: 4, storage: 512, cpu: 'Intel Xeon E-2388G', price: 140, durationType: 'yearly', serverId: servers[0]._id, isAvailable: true },
    { name: 'VPS Advanced', category: 'large', ram: 8, storage: 512, cpu: 'Intel Xeon E-2388G', price: 250, durationType: 'yearly', serverId: servers[0]._id, isAvailable: true },
    { name: 'VPS Professional', category: 'professional', ram: 16, storage: 1024, cpu: 'Intel Xeon E-2388G', price: 450, durationType: 'yearly', serverId: servers[0]._id, isAvailable: true },
    // ===== VPS - Purchase =====
    { name: 'VPS Starter', category: 'economic', ram: 2, storage: 256, cpu: 'Intel Xeon E-2388G', price: 380, durationType: 'purchase', serverId: servers[0]._id, isAvailable: true },
    { name: 'VPS Standard', category: 'medium', ram: 4, storage: 512, cpu: 'Intel Xeon E-2388G', price: 650, durationType: 'purchase', serverId: servers[0]._id, isAvailable: true },
    { name: 'VPS Advanced', category: 'large', ram: 8, storage: 512, cpu: 'Intel Xeon E-2388G', price: 1150, durationType: 'purchase', serverId: servers[0]._id, isAvailable: true },
    { name: 'VPS Professional', category: 'professional', ram: 16, storage: 1024, cpu: 'Intel Xeon E-2388G', price: 2100, durationType: 'purchase', serverId: servers[0]._id, isAvailable: true },

    // ===== NVMe - Monthly =====
    { name: 'NVMe Starter', category: 'economic', ram: 4, storage: 256, cpu: 'AMD EPYC 7402', price: 17, durationType: 'monthly', serverId: servers[1]._id, isAvailable: true },
    { name: 'NVMe Standard', category: 'medium', ram: 8, storage: 512, cpu: 'AMD EPYC 7402', price: 30, durationType: 'monthly', serverId: servers[1]._id, isAvailable: true },
    { name: 'NVMe Advanced', category: 'large', ram: 16, storage: 1024, cpu: 'AMD EPYC 7402', price: 55, durationType: 'monthly', serverId: servers[1]._id, isAvailable: true },
    { name: 'NVMe Professional', category: 'professional', ram: 32, storage: 2048, cpu: 'AMD EPYC 7402', price: 100, durationType: 'monthly', serverId: servers[1]._id, isAvailable: true },
    // ===== NVMe - Yearly =====
    { name: 'NVMe Starter', category: 'economic', ram: 4, storage: 256, cpu: 'AMD EPYC 7402', price: 170, durationType: 'yearly', serverId: servers[1]._id, isAvailable: true },
    { name: 'NVMe Standard', category: 'medium', ram: 8, storage: 512, cpu: 'AMD EPYC 7402', price: 300, durationType: 'yearly', serverId: servers[1]._id, isAvailable: true },
    { name: 'NVMe Advanced', category: 'large', ram: 16, storage: 1024, cpu: 'AMD EPYC 7402', price: 550, durationType: 'yearly', serverId: servers[1]._id, isAvailable: true },
    { name: 'NVMe Professional', category: 'professional', ram: 32, storage: 2048, cpu: 'AMD EPYC 7402', price: 1000, durationType: 'yearly', serverId: servers[1]._id, isAvailable: true },
    // ===== NVMe - Purchase =====
    { name: 'NVMe Starter', category: 'economic', ram: 4, storage: 256, cpu: 'AMD EPYC 7402', price: 765, durationType: 'purchase', serverId: servers[1]._id, isAvailable: true },
    { name: 'NVMe Standard', category: 'medium', ram: 8, storage: 512, cpu: 'AMD EPYC 7402', price: 1350, durationType: 'purchase', serverId: servers[1]._id, isAvailable: true },
    { name: 'NVMe Advanced', category: 'large', ram: 16, storage: 1024, cpu: 'AMD EPYC 7402', price: 2475, durationType: 'purchase', serverId: servers[1]._id, isAvailable: true },
    { name: 'NVMe Professional', category: 'professional', ram: 32, storage: 2048, cpu: 'AMD EPYC 7402', price: 4500, durationType: 'purchase', serverId: servers[1]._id, isAvailable: true },

    // ===== Cloud - Monthly =====
    { name: 'Cloud Starter', category: 'economic', ram: 8, storage: 256, cpu: 'Intel Xeon Gold 6226R', price: 22, durationType: 'monthly', serverId: servers[2]._id, isAvailable: true },
    { name: 'Cloud Standard', category: 'medium', ram: 16, storage: 512, cpu: 'Intel Xeon Gold 6226R', price: 42, durationType: 'monthly', serverId: servers[2]._id, isAvailable: true },
    { name: 'Cloud Advanced', category: 'large', ram: 32, storage: 1024, cpu: 'Intel Xeon Gold 6226R', price: 72, durationType: 'monthly', serverId: servers[2]._id, isAvailable: true },
    { name: 'Cloud Professional', category: 'professional', ram: 64, storage: 2048, cpu: 'Intel Xeon Gold 6226R', price: 128, durationType: 'monthly', serverId: servers[2]._id, isAvailable: true },
    // ===== Cloud - Yearly =====
    { name: 'Cloud Starter', category: 'economic', ram: 8, storage: 256, cpu: 'Intel Xeon Gold 6226R', price: 220, durationType: 'yearly', serverId: servers[2]._id, isAvailable: true },
    { name: 'Cloud Standard', category: 'medium', ram: 16, storage: 512, cpu: 'Intel Xeon Gold 6226R', price: 420, durationType: 'yearly', serverId: servers[2]._id, isAvailable: true },
    { name: 'Cloud Advanced', category: 'large', ram: 32, storage: 1024, cpu: 'Intel Xeon Gold 6226R', price: 720, durationType: 'yearly', serverId: servers[2]._id, isAvailable: true },
    { name: 'Cloud Professional', category: 'professional', ram: 64, storage: 2048, cpu: 'Intel Xeon Gold 6226R', price: 1280, durationType: 'yearly', serverId: servers[2]._id, isAvailable: true },
    // ===== Cloud - Purchase =====
    { name: 'Cloud Starter', category: 'economic', ram: 8, storage: 256, cpu: 'Intel Xeon Gold 6226R', price: 990, durationType: 'purchase', serverId: servers[2]._id, isAvailable: true },
    { name: 'Cloud Standard', category: 'medium', ram: 16, storage: 512, cpu: 'Intel Xeon Gold 6226R', price: 1890, durationType: 'purchase', serverId: servers[2]._id, isAvailable: true },
    { name: 'Cloud Advanced', category: 'large', ram: 32, storage: 1024, cpu: 'Intel Xeon Gold 6226R', price: 3240, durationType: 'purchase', serverId: servers[2]._id, isAvailable: true },
    { name: 'Cloud Professional', category: 'professional', ram: 64, storage: 2048, cpu: 'Intel Xeon Gold 6226R', price: 5760, durationType: 'purchase', serverId: servers[2]._id, isAvailable: true },

    // ===== Windows - Monthly =====
    { name: 'Windows Starter', category: 'economic', ram: 4, storage: 256, cpu: 'Intel Xeon E-2334', price: 19, durationType: 'monthly', serverId: servers[3]._id, isAvailable: true },
    { name: 'Windows Standard', category: 'medium', ram: 8, storage: 512, cpu: 'Intel Xeon E-2334', price: 33, durationType: 'monthly', serverId: servers[3]._id, isAvailable: true },
    { name: 'Windows Advanced', category: 'large', ram: 16, storage: 1024, cpu: 'Intel Xeon E-2334', price: 61, durationType: 'monthly', serverId: servers[3]._id, isAvailable: true },
    { name: 'Windows Professional', category: 'professional', ram: 32, storage: 2048, cpu: 'Intel Xeon E-2334', price: 111, durationType: 'monthly', serverId: servers[3]._id, isAvailable: true },
    // ===== Windows - Yearly =====
    { name: 'Windows Starter', category: 'economic', ram: 4, storage: 256, cpu: 'Intel Xeon E-2334', price: 190, durationType: 'yearly', serverId: servers[3]._id, isAvailable: true },
    { name: 'Windows Standard', category: 'medium', ram: 8, storage: 512, cpu: 'Intel Xeon E-2334', price: 330, durationType: 'yearly', serverId: servers[3]._id, isAvailable: true },
    { name: 'Windows Advanced', category: 'large', ram: 16, storage: 1024, cpu: 'Intel Xeon E-2334', price: 610, durationType: 'yearly', serverId: servers[3]._id, isAvailable: true },
    { name: 'Windows Professional', category: 'professional', ram: 32, storage: 2048, cpu: 'Intel Xeon E-2334', price: 1110, durationType: 'yearly', serverId: servers[3]._id, isAvailable: true },
    // ===== Windows - Purchase =====
    { name: 'Windows Starter', category: 'economic', ram: 4, storage: 256, cpu: 'Intel Xeon E-2334', price: 855, durationType: 'purchase', serverId: servers[3]._id, isAvailable: true },
    { name: 'Windows Standard', category: 'medium', ram: 8, storage: 512, cpu: 'Intel Xeon E-2334', price: 1485, durationType: 'purchase', serverId: servers[3]._id, isAvailable: true },
    { name: 'Windows Advanced', category: 'large', ram: 16, storage: 1024, cpu: 'Intel Xeon E-2334', price: 2745, durationType: 'purchase', serverId: servers[3]._id, isAvailable: true },
    { name: 'Windows Professional', category: 'professional', ram: 32, storage: 2048, cpu: 'Intel Xeon E-2334', price: 4995, durationType: 'purchase', serverId: servers[3]._id, isAvailable: true },
  ]);
  console.log('✅ Packages inserted (48 packages)');

  // Reviews
  await Review.insertMany([
    { comment: 'Excellent service and amazing speed', rate: 5, userId: ADMIN_ID },
    { comment: 'High quality and reasonable price', rate: 4, userId: ADMIN_ID },
    { comment: 'Good experience overall', rate: 4, userId: ADMIN_ID },
    { comment: 'Technical support responds quickly', rate: 5, userId: ADMIN_ID },
    { comment: 'Excellent performance and no downtime', rate: 5, userId: ADMIN_ID },
  ]);
  console.log('✅ Reviews inserted');

  // Orders
  await Order.insertMany([
    {
      methodPayment: 'shamCash',
      paymentNumber: '1234567890',
      status: 'completed',
      userId: ADMIN_ID,
      item: [{ type: 'buy', price: 380, duration: 0, packageId: packages[8]._id }],
    },
    {
      methodPayment: 'syriatelCash',
      paymentNumber: '0987654321',
      status: 'pending',
      userId: ADMIN_ID,
      item: [{ type: 'rent', price: 17, duration: 30, packageId: packages[12]._id }],
    },
    {
      methodPayment: 'shamCash',
      paymentNumber: '1122334455',
      status: 'active',
      userId: ADMIN_ID,
      item: [{ type: 'rent', price: 22, duration: 30, packageId: packages[24]._id }],
    },
    {
      methodPayment: 'syriatelCash',
      paymentNumber: '5544332211',
      status: 'completed',
      userId: ADMIN_ID,
      item: [{ type: 'buy', price: 855, duration: 0, packageId: packages[36]._id }],
    },
    {
      methodPayment: 'shamCash',
      paymentNumber: '6677889900',
      status: 'cancelled',
      userId: ADMIN_ID,
      item: [{ type: 'rent', price: 30, duration: 30, packageId: packages[13]._id }],
    },
    {
      methodPayment: 'syriatelCash',
      paymentNumber: '9900778866',
      status: 'active',
      userId: ADMIN_ID,
      item: [
        { type: 'rent', price: 42, duration: 365, packageId: packages[29]._id },
        { type: 'buy', price: 650, duration: 0, packageId: packages[9]._id },
      ],
    },
  ]);
  console.log('✅ Orders inserted');

  // Messages
  await Message.insertMany([
    { title: 'Welcome to Server Shop', body: { message: 'Thank you for registering with us, we wish you a great experience' }, isRead: true, userId: ADMIN_ID },
    { title: 'Your order has been confirmed', body: { orderId: 'ORDER_ID', message: 'Your order has been received and is being processed' }, isRead: true, userId: ADMIN_ID },
    { title: 'Special offer for you', body: { message: 'Get 20% discount on all VPS plans this month' }, isRead: false, userId: ADMIN_ID },
    { title: 'System update', body: { message: 'Scheduled maintenance will be performed next Friday' }, isRead: false, userId: ADMIN_ID },
    { title: 'Subscription renewal', body: { message: 'Your subscription will expire in 3 days, please renew', daysLeft: 3 }, isRead: false, userId: ADMIN_ID },
  ]);
  console.log('✅ Messages inserted');

  console.log('\n🎉 All data seeded successfully!');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('❌ Error:', err);
  mongoose.disconnect();
});
