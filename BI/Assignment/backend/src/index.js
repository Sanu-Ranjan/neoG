require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const eventRoutes = require("./routes/eventRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const homePath = "/neog/BI/Assignment";

app.use(`${homePath}/events`, eventRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
