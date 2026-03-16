const mongoose = require("mongoose");
require("dotenv").config();

const initializeDb = async () => {
  const mongoUri = process.env.MONGODB;
  await mongoose
    .connect(mongoUri)
    .then(() => console.log("Connected to db"))
    .catch((err) => console.log("error connecting to db \n", err));
};

module.exports = {
  initializeDb,
};
