const express = require("express");
const cors = require("cors");

const { API_ROUTES } = require("./constants/apiRoutes");
const postings = require("./routes/postings.route");

const app = express();
app.use(express.json());

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS;
if (!ALLOWED_ORIGINS) {
  console.log("Error : allowed ORIGIN not set");
  process.exit(1);
}

const allowedOrigins = ALLOWED_ORIGINS?.split(",") || [];

app.use(
  cors({
    origin: allowedOrigins,
  }),
);

app.get(API_ROUTES.home, (req, res) => {
  res.send("Welcome to rojgar app Api");
});

app.use(API_ROUTES.postings, postings.router);

module.exports = { app };
