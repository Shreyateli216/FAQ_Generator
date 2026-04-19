const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Faq = require('./models/Faq');

const checkDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const counts = {
      users: await User.countDocuments(),
      faqs: await Faq.countDocuments()
    };

    console.log('Database Counts:', JSON.stringify(counts, null, 2));
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

checkDb();
