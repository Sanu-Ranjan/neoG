const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  const mongoUri = process.env.MONGODB;
  await mongoose
    .connect(mongoUri)
    .then(() => console.log("connected to db"))
    .catch((err) => console.log("Connection to db failed", err));
};

module.exports = {
  connectDb,
};
