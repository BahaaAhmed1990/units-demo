const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`DB is connected at ${conn.connection.host}`);
  } catch (error) {
    console.log(error.code);
    process.exit(1);
  }
};

module.exports = connectDB;
