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

const success = (message, data) => {
  return {
    success: true,
    message: message,
    data: data,
  };
};

const fail = (message, details = null) => {
  return {
    success: false,
    error: message,
    details: details,
  };
};

const deleteRes = async (queryParam) => {
  try {
    const data = await Restaurant.findOneAndDelete(queryParam);
    return dataObj.data(data);
  } catch (error) {
    return dataObj.error(error);
  }
};

app.delete("/restaurants/:restaurantId", async (req, res) => {
  const { restaurantId } = req.params;

  const { data, error } = await deleteRes({ _id: restaurantId });

  if (error) {
    console.log("Db error: error deleting restaurant", error);
    return res.status(500).json(fail("Internal server error"));
  }

  if (!data) {
    return res.status(404).json(fail("No restaurant found"));
  }

  res.status(200).json(success("Restaurant deleted", data));
});

(async () => {
  await initializeDB();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log("Server Listening on port :", PORT);
  });
})();
