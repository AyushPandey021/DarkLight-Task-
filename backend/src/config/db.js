const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect( "mongodb+srv://vlogayush51_db_user:x6pJQdyS8R6v1cFP@cluster0.bauvaqa.mongodb.net/?appName=Cluster0");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;



