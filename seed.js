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
    totalStorage: String,
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
    storage: String,
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

  // Clear old data
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
    { name: 'Shared', description: 'مشاركة موارد السيرفر مع مستخدمين آخرين، مناسب للمواقع الصغيرة' },
    { name: 'VPS', description: 'سيرفر افتراضي خاص بموارد مضمونة ومرونة عالية' },
    { name: 'Dedicated', description: 'سيرفر مخصص بالكامل لك بأعلى أداء وأمان' },
    { name: 'Cloud', description: 'بنية سحابية قابلة للتوسع حسب الحاجة' },
  ]);
  console.log('✅ Types inserted');

  // Servers
  const servers = await Server.insertMany([
    {
      name: 'Alpha-VPS-01',
      location: 'Damascus',
      cpu: 'Intel Xeon E-2334',
      totalRam: 256,
      usedRam: 0,
      totalStorage: '4 TB',
      usedStorage: 0,
      isAvailable: true,
      lastChecked: new Date(),
      typeId: types[1]._id,
    },
    {
      name: 'Beta-Dedicated-01',
      location: 'Aleppo',
      cpu: 'AMD EPYC 7302',
      totalRam: 256,
      usedRam: 0,
      totalStorage: '4 TB',
      usedStorage: 0,
      isAvailable: true,
      lastChecked: new Date(),
      typeId: types[2]._id,
    },
    {
      name: 'Gamma-Cloud-01',
      location: 'Lattakia',
      cpu: 'Intel Xeon Gold 6226R',
      totalRam: 256,
      usedRam: 0,
      totalStorage: '4 TB',
      usedStorage: 0,
      isAvailable: true,
      lastChecked: new Date(),
      typeId: types[3]._id,
    },
    {
      name: 'Delta-Shared-01',
      location: 'Damascus',
      cpu: 'Intel Xeon E-2334',
      totalRam: 128,
      usedRam: 0,
      totalStorage: '2 TB',
      usedStorage: 0,
      isAvailable: true,
      lastChecked: new Date(),
      typeId: types[0]._id,
    },
  ]);
  console.log('✅ Servers inserted');

  // Packages
  const packages = await Package.insertMany([
    {
      name: 'VPS Starter',
      ram: 4,
      storage: '256 GB',
      cpu: 'Intel Xeon E-2334',
      price: 99,
      priceMonthly: 9,
      serverId: servers[0]._id,
      isAvailable: true,
    },
    {
      name: 'VPS Pro',
      ram: 8,
      storage: '512 GB',
      cpu: 'Intel Xeon E-2334',
      price: 199,
      priceMonthly: 19,
      serverId: servers[0]._id,
      isAvailable: true,
    },
    {
      name: 'Dedicated Basic',
      ram: 16,
      storage: '512 GB',
      cpu: 'AMD EPYC 7302',
      price: 499,
      priceMonthly: 49,
      serverId: servers[1]._id,
      isAvailable: true,
    },
    {
      name: 'Dedicated Pro',
      ram: 32,
      storage: '1 TB',
      cpu: 'AMD EPYC 7302',
      price: 799,
      priceMonthly: 79,
      serverId: servers[1]._id,
      isAvailable: true,
    },
    {
      name: 'Cloud Starter',
      ram: 8,
      storage: '256 GB',
      cpu: 'Intel Xeon Gold 6226R',
      price: 299,
      priceMonthly: 29,
      serverId: servers[2]._id,
      isAvailable: true,
    },
    {
      name: 'Shared Basic',
      ram: 4,
      storage: '256 GB',
      cpu: 'Intel Xeon E-2334',
      price: 49,
      priceMonthly: 4,
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
      methodPayment: 'credit_card',
      status: 'completed',
      userId: ADMIN_ID,
      item: [{ type: 'buy', price: 99, duration: 0, packageId: packages[0]._id }],
    },
    {
      methodPayment: 'shamCash',
      status: 'pending',
      userId: ADMIN_ID,
      item: [{ type: 'rent', price: 49, duration: 30, packageId: packages[1]._id }],
    },
    {
      methodPayment: 'credit_card',
      status: 'active',
      userId: ADMIN_ID,
      item: [{ type: 'rent', price: 79, duration: 30, packageId: packages[2]._id }],
    },
    {
      methodPayment: 'shamCash',
      status: 'completed',
      userId: ADMIN_ID,
      item: [{ type: 'buy', price: 499, duration: 0, packageId: packages[3]._id }],
    },
    {
      methodPayment: 'credit_card',
      status: 'cancelled',
      userId: ADMIN_ID,
      item: [{ type: 'rent', price: 29, duration: 30, packageId: packages[4]._id }],
    },
    {
      methodPayment: 'shamCash',
      status: 'active',
      userId: ADMIN_ID,
      item: [
        { type: 'rent', price: 29, duration: 30, packageId: packages[4]._id },
        { type: 'buy', price: 49, duration: 0, packageId: packages[5]._id },
      ],
    },
  ]);
  console.log('✅ Orders inserted');

  // Messages
  await Message.insertMany([
    { title: 'مرحباً بك في المنصة', body: 'شكراً لتسجيلك معنا، نتمنى لك تجربة رائعة', isRead: true, userId: ADMIN_ID },
    { title: 'تم تأكيد طلبك', body: 'تم استلام طلبك وهو قيد المعالجة الآن', isRead: true, userId: ADMIN_ID },
    { title: 'عرض خاص لك', body: 'احصل على خصم 20% على جميع باقات VPS هذا الشهر', isRead: false, userId: ADMIN_ID },
    { title: 'تحديث النظام', body: 'سيتم إجراء صيانة مجدولة يوم الجمعة القادم', isRead: false, userId: ADMIN_ID },
    { title: 'تجديد الاشتراك', body: 'اشتراكك سينتهي خلال 7 أيام، يرجى التجديد', isRead: false, userId: ADMIN_ID },
  ]);
  console.log('✅ Messages inserted');

  console.log('\n🎉 All data seeded successfully!');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('❌ Error:', err);
  mongoose.disconnect();
});
