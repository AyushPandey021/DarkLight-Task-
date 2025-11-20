const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect( "mongodb://127.0.0.1:27017/darklight");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
