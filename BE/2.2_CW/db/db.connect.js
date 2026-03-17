require("dotenv").config();
const mongoose = require("mongoose");

const initializeDB = async () => {
  await mongoose
    .connect(process.env.MONGODB)
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log("Error connecting to db", err));
};

module.exports = {
  initializeDB,
};
