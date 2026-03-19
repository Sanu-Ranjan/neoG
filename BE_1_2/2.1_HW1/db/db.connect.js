const mongoose = require("mongoose");
require("dotenv").config();

const initializeDB = async () => {
  await mongoose
    .connect(process.env.MONGODB)
    .then(() => console.log("connected to DB"))
    .catch((err) => console.log(err));
};

module.exports = {
  initializeDB,
};
