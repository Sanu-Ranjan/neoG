require("dotenv").config();
const { Restaurant } = require("../../BE_1_2/2.1_HW1/models/restaurants");
const { initializeDB } = require("../../BE_1_2/2.1_CW/db/db.connect");
const express = require("express");

const app = express();
app.use(express.json());

const dataObj = {
  data: (data) => ({ data: data, error: null }),
  error: (error) => ({ data: null, error: error }),
};

const success = (message, data) => ({
  success: true,
  message,
  data,
});

const fail = (message, details = null) => ({
  success: false,
  error: message,
  details,
});

const updateRes = async (queryParam, updateData) => {
  try {
    const data = await Restaurant.findOneAndUpdate(queryParam, updateData, {
      new: true,
    });
    return dataObj.data(data);
  } catch (error) {
    return dataObj.error(error);
  }
};

app.post("/restaurants/:restaurantId", async (req, res) => {
  const { restaurantId } = req.params;

  const { data, error } = await updateRes({ _id: restaurantId }, req.body);

  if (error) {
    console.log("Db error: updating restaurant", error);
    return res.status(500).json(fail("Internal server error"));
  }

  if (!data) {
    return res.status(404).json(fail("No restaurant found"));
  }

  res.status(200).json(success("Restaurant updated", data));
});
(async () => {
  await initializeDB();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log("Server Listening on port :", PORT);
  });
})();
