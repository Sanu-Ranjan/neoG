const mongoose = require("mongoose");
require("dotenv").config();

const initializeDb = async () => {
  await mongoose
    .connect(process.env.MONGODB)
    .then(() => console.log("Connected to db"))
    .catch((err) => console.log(err));
};

module.exports = {
  initializeDb,
};
