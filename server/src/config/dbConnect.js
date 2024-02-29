const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI =
  process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce-takis"; //node 18.12.1
console.log(mongoURI);
async function connectDB() {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connect database success");
  } catch (error) {
    console.log("Connect fail", error);
  }
}

module.exports = connectDB;
