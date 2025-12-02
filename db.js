const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    
    if (!uri) {
      throw new Error('MONGODB_URI environment variable not set');
    }

    await mongoose.connect(uri);
    console.log('✅ MongoDB Connected');
    
  } catch (error) {
    console.error('❌ MongoDB Error:', error.message);
    setTimeout(connectDB, 5000);
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected - reconnecting...');
  setTimeout(connectDB, 5000);
});

module.exports = connectDB;
