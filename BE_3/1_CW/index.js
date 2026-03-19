const express = require("express");
require("dotenv").config();
const app = express();

app.get("/", (req, res) => {
  res.send("this is home endpoint of the API");
});

app.get("/about", (req, res) => {
  res.send("this is about endpoint of the API");
});

app.get("/contacts", (req, res) => {
  res.send("this is contacts endpoint of the API");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server is listening on port : ", port));
