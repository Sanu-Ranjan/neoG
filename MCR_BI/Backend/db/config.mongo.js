const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.log("Fatal Error: MONGO_URI not set");
  process.exit(1);
}

const initializeDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("✓ Connected to MongoDB");
  } catch (error) {
    console.log("✗ Error Connecting DB : ", error);
    process.exit(1);
  }
};

module.exports = { initializeDB };
