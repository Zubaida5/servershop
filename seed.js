const mongoose = require('mongoose');

const DB = 'mongodb://127.0.0.1:27017/servershopDb';
const ADMIN_ID = new mongoose.Types.ObjectId('69d108448e6b7e558de7988f');

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
    lastChecked: Date,
    typeId: { type: mongoose.Schema.ObjectId, ref: 'Type' },
  },
  { timestamps: true, versionKey: false },
);
const Server = mongoose.model('Server', serverSchema);

const packageSchema = new mongoose.Schema(
  {
    name: String,
    ram: Number,
    storage: Number,
    cpu: String,
    price: Number,
    priceMonthly: Number,
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
    body: String,
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

  await Promise.all([
    Type.deleteMany({}),
    Server.deleteMany({}),
    Package.deleteMany({}),
    Review.deleteMany({}),
    Order.deleteMany({}),
    Message.deleteMany({}),
  ]);
  console.log('🗑️  Cleared old data');

  // Types
  const types = await Type.insertMany([
    {
      name: 'VPS',
      description:
        'سيرفر افتراضي خاص بموارد مضمونة ومرونة عالية، يعتمد على هاردات SSD عادية',
    },
    {
      name: 'VPS-NVMe',
      description:
        'سيرفر افتراضي بهاردات NVMe فائقة السرعة، أسعاره أعلى قليلاً',
    },
    {
      name: 'Cloud',
      description:
        'بيئة سحابية مرنة تعتمد على توزيع البيانات على أكثر من سيرفر لضمان عدم توقف الموقع',
    },
    {
      name: 'Windows',
      description:
        'سيرفرات تعمل بنظام Windows Server، مخصصة للمطورين الذين يحتاجون بيئة عمل ميكروسوفت',
    },
  ]);
  console.log('✅ Types inserted');

  // Servers (totalStorage بالغيغا)
  const servers = await Server.insertMany([
    {
      name: 'VPS-Server-01',
      location: 'Damascus',
      cpu: 'Intel Xeon E-2388G',
      totalRam: 256,
      usedRam: 0,
      totalStorage: 4096, // 4 TB
      usedStorage: 0,
      isAvailable: true,
      lastChecked: new Date(),
      typeId: types[0]._id,
    },
    {
      name: 'NVMe-Server-01',
      location: 'Aleppo',
      cpu: 'AMD EPYC 7402',
      totalRam: 256,
      usedRam: 0,
      totalStorage: 4096, // 4 TB
      usedStorage: 0,
      isAvailable: true,
      lastChecked: new Date(),
      typeId: types[1]._id,
    },
    {
      name: 'Cloud-Server-01',
      location: 'Lattakia',
      cpu: 'Intel Xeon Gold 6226R',
      totalRam: 512,
      usedRam: 0,
      totalStorage: 4096, // 4 TB
      usedStorage: 0,
      isAvailable: true,
      lastChecked: new Date(),
      typeId: types[2]._id,
    },
    {
      name: 'Windows-Server-01',
      location: 'Damascus',
      cpu: 'Intel Xeon E-2334',
      totalRam: 256,
      usedRam: 0,
      totalStorage: 2048, // 2 TB
      usedStorage: 0,
      isAvailable: true,
      lastChecked: new Date(),
      typeId: types[3]._id,
    },
  ]);
  console.log('✅ Servers inserted');

  // Packages (storage بالغيغا)
  const packages = await Package.insertMany([
    // VPS Packages
    {
      name: 'VPS اقتصادية',
      ram: 2,
      storage: 256,
      cpu: 'Intel Xeon E-2388G',
      price: 15,
      priceMonthly: 8,
      serverId: servers[0]._id,
      isAvailable: true,
    },
    {
      name: 'VPS متوسطة',
      ram: 4,
      storage: 512,
      cpu: 'Intel Xeon E-2388G',
      price: 25,
      priceMonthly: 14,
      serverId: servers[0]._id,
      isAvailable: true,
    },
    {
      name: 'VPS كبيرة',
      ram: 8,
      storage: 512,
      cpu: 'Intel Xeon E-2388G',
      price: 45,
      priceMonthly: 25,
      serverId: servers[0]._id,
      isAvailable: true,
    },
    {
      name: 'VPS احترافية',
      ram: 16,
      storage: 1024,
      cpu: 'Intel Xeon E-2388G',
      price: 80,
      priceMonthly: 45,
      serverId: servers[0]._id,
      isAvailable: true,
    },

    // NVMe Packages
    {
      name: 'NVMe اقتصادية',
      ram: 4,
      storage: 256,
      cpu: 'AMD EPYC 7402',
      price: 30,
      priceMonthly: 17,
      serverId: servers[1]._id,
      isAvailable: true,
    },
    {
      name: 'NVMe متوسطة',
      ram: 8,
      storage: 512,
      cpu: 'AMD EPYC 7402',
      price: 55,
      priceMonthly: 30,
      serverId: servers[1]._id,
      isAvailable: true,
    },
    {
      name: 'NVMe كبيرة',
      ram: 16,
      storage: 1024,
      cpu: 'AMD EPYC 7402',
      price: 99,
      priceMonthly: 55,
      serverId: servers[1]._id,
      isAvailable: true,
    },
    {
      name: 'NVMe احترافية',
      ram: 32,
      storage: 2048,
      cpu: 'AMD EPYC 7402',
      price: 180,
      priceMonthly: 100,
      serverId: servers[1]._id,
      isAvailable: true,
    },

    // Cloud Packages
    {
      name: 'Cloud اقتصادية',
      ram: 8,
      storage: 256,
      cpu: 'Intel Xeon Gold 6226R',
      price: 40,
      priceMonthly: 22,
      serverId: servers[2]._id,
      isAvailable: true,
    },
    {
      name: 'Cloud متوسطة',
      ram: 16,
      storage: 512,
      cpu: 'Intel Xeon Gold 6226R',
      price: 75,
      priceMonthly: 42,
      serverId: servers[2]._id,
      isAvailable: true,
    },
    {
      name: 'Cloud كبيرة',
      ram: 32,
      storage: 1024,
      cpu: 'Intel Xeon Gold 6226R',
      price: 130,
      priceMonthly: 72,
      serverId: servers[2]._id,
      isAvailable: true,
    },
    {
      name: 'Cloud احترافية',
      ram: 64,
      storage: 2048,
      cpu: 'Intel Xeon Gold 6226R',
      price: 230,
      priceMonthly: 128,
      serverId: servers[2]._id,
      isAvailable: true,
    },

    // Windows Packages
    {
      name: 'Windows اقتصادية',
      ram: 4,
      storage: 256,
      cpu: 'Intel Xeon E-2334',
      price: 35,
      priceMonthly: 19,
      serverId: servers[3]._id,
      isAvailable: true,
    },
    {
      name: 'Windows متوسطة',
      ram: 8,
      storage: 512,
      cpu: 'Intel Xeon E-2334',
      price: 60,
      priceMonthly: 33,
      serverId: servers[3]._id,
      isAvailable: true,
    },
    {
      name: 'Windows كبيرة',
      ram: 16,
      storage: 1024,
      cpu: 'Intel Xeon E-2334',
      price: 110,
      priceMonthly: 61,
      serverId: servers[3]._id,
      isAvailable: true,
    },
    {
      name: 'Windows احترافية',
      ram: 32,
      storage: 2048,
      cpu: 'Intel Xeon E-2334',
      price: 200,
      priceMonthly: 111,
      serverId: servers[3]._id,
      isAvailable: true,
    },
  ]);
  console.log('✅ Packages inserted');

  // Reviews
  await Review.insertMany([
    { comment: 'خدمة ممتازة وسرعة رائعة', rate: 5, userId: ADMIN_ID },
    { comment: 'جودة عالية وسعر مناسب', rate: 4, userId: ADMIN_ID },
    { comment: 'تجربة جيدة بشكل عام', rate: 4, userId: ADMIN_ID },
    { comment: 'الدعم الفني سريع الاستجابة', rate: 5, userId: ADMIN_ID },
    { comment: 'أداء ممتاز ولا توقف', rate: 5, userId: ADMIN_ID },
  ]);
  console.log('✅ Reviews inserted');

  // Orders
  await Order.insertMany([
    {
      methodPayment: 'shamCash',
      paymentNumber: '1234567890',
      status: 'completed',
      userId: ADMIN_ID,
      item: [
        { type: 'buy', price: 15, duration: 0, packageId: packages[0]._id },
      ],
    },
    {
      methodPayment: 'syriatelCash',
      paymentNumber: '0987654321',
      status: 'pending',
      userId: ADMIN_ID,
      item: [
        { type: 'rent', price: 17, duration: 30, packageId: packages[4]._id },
      ],
    },
    {
      methodPayment: 'shamCash',
      paymentNumber: '1122334455',
      status: 'active',
      userId: ADMIN_ID,
      item: [
        { type: 'rent', price: 22, duration: 30, packageId: packages[8]._id },
      ],
    },
    {
      methodPayment: 'syriatelCash',
      paymentNumber: '5544332211',
      status: 'completed',
      userId: ADMIN_ID,
      item: [
        { type: 'buy', price: 35, duration: 0, packageId: packages[12]._id },
      ],
    },
    {
      methodPayment: 'shamCash',
      paymentNumber: '6677889900',
      status: 'cancelled',
      userId: ADMIN_ID,
      item: [
        { type: 'rent', price: 30, duration: 30, packageId: packages[5]._id },
      ],
    },
    {
      methodPayment: 'syriatelCash',
      paymentNumber: '9900778866',
      status: 'active',
      userId: ADMIN_ID,
      item: [
        { type: 'rent', price: 42, duration: 30, packageId: packages[9]._id },
        { type: 'buy', price: 25, duration: 0, packageId: packages[1]._id },
      ],
    },
  ]);
  console.log('✅ Orders inserted');

  // Messages
  await Message.insertMany([
    {
      title: 'مرحباً بك في المنصة',
      body: 'شكراً لتسجيلك معنا، نتمنى لك تجربة رائعة',
      isRead: true,
      userId: ADMIN_ID,
    },
    {
      title: 'تم تأكيد طلبك',
      body: 'تم استلام طلبك وهو قيد المعالجة الآن',
      isRead: true,
      userId: ADMIN_ID,
    },
    {
      title: 'عرض خاص لك',
      body: 'احصل على خصم 20% على جميع باقات VPS هذا الشهر',
      isRead: false,
      userId: ADMIN_ID,
    },
    {
      title: 'تحديث النظام',
      body: 'سيتم إجراء صيانة مجدولة يوم الجمعة القادم',
      isRead: false,
      userId: ADMIN_ID,
    },
    {
      title: 'تجديد الاشتراك',
      body: 'اشتراكك سينتهي خلال 3 أيام، يرجى التجديد',
      isRead: false,
      userId: ADMIN_ID,
    },
  ]);
  console.log('✅ Messages inserted');

  console.log('\n🎉 All data seeded successfully!');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('❌ Error:', err);
  mongoose.disconnect();
});
