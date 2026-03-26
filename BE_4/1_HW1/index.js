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

const findAllRes = async () => {
  try {
    const data = await Restaurant.find();
    return dataObj.data(data);
  } catch (error) {
    return dataObj.error(error);
  }
};

const findOne = async (querryParam) => {
  try {
    const data = await Restaurant.findOne(querryParam);
    return dataObj.data(data);
  } catch (error) {
    return dataObj.error(error);
  }
};

const findAll = async (querryParam) => {
  try {
    const data = await Restaurant.find(querryParam);
    return dataObj.data(data);
  } catch (error) {
    return dataObj.error(error);
  }
};

app.get("/restaurants", async (req, res) => {
  const { data, error } = await findAllRes();
  if (error) {
    console.log("Db Error: error finding all restaurants", error);

    return res.status(500).json(fail("Internal server error"));
  }

  res.status(200).json(success("All Restaurants", data));
});

app.get("/restaurants/:restaurantName", async (req, res) => {
  const { restaurantName } = req.params;

  const { data, error } = await findOne({ name: restaurantName });

  if (error) {
    console.log("Db error: error finding a restaurant by name", error);
    res.status(500).json(fail("Internal server error"));
  }

  if (!data) return res.status(404).json(fail("No restaurant found"));

  res.status(200).json(success("Restaurant found", data));
});

app.get("/restaurants/directory/:phoneNumber", async (req, res) => {
  const { phoneNumber } = req.params;

  const { data, error } = await findOne({ phoneNumber: phoneNumber });

  if (error) {
    console.log("Db error: error finding a restaurant by phone", error);
    res.status(500).json(fail("Internal server error"));
  }

  if (!data) return res.status(404).json(fail("No restaurant found"));

  res.status(200).json(success("Restaurant found", data));
});

app.get("/restaurants/cuisine/:cuisineName", async (req, res) => {
  const { cuisineName } = req.params;

  const { data, error } = await findAll({ cuisine: cuisineName });

  if (error) {
    console.log("Db error: error finding a restaurant by cuisine", error);
    res.status(500).json(fail("Internal server error"));
  }

  if (data.length === 0)
    return res.status(404).json(fail("No restaurant found"));

  res.status(200).json(success("Restaurants found", data));
});

app.get("/restaurants/location/:restaurantLocation", async (req, res) => {
  const { restaurantLocation } = req.params;

  const { data, error } = await findAll({ location: restaurantLocation });

  if (error) {
    console.log("Db error: error finding a restaurant by location", error);
    res.status(500).json(fail("Internal server error"));
  }

  if (data.length === 0)
    return res.status(404).json(fail("No restaurant found"));

  res.status(200).json(success("Restaurants found", data));
});

(async () => {
  await initializeDB();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log("Server Listening on port : ", PORT);
  });
})();
