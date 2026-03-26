require("dotenv").config();
const express = require("express");
const { initializeDB } = require("../../BE_1_2/2.1_CW/db/db.connect");
const { Hotel } = require("../../BE_1_2/2.4_HW2/models/hotel.models");

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

const findAllHotels = async () => {
  try {
    const data = await Hotel.find();
    return dataObj.data(data);
  } catch (error) {
    return dataObj.error(error);
  }
};

const findOneHotel = async (query) => {
  try {
    const data = await Hotel.findOne(query);
    return dataObj.data(data);
  } catch (error) {
    return dataObj.error(error);
  }
};

const findAllByFilter = async (query) => {
  try {
    const data = await Hotel.find(query);
    return dataObj.data(data);
  } catch (error) {
    return dataObj.error(error);
  }
};

app.get("/hotels", async (req, res) => {
  const { data, error } = await findAllHotels();

  if (error) {
    console.log("DB error: fetching all hotels", error);
    return res.status(500).json(fail("Internal server error"));
  }

  res.status(200).json(success("All hotels", data));
});

app.get("/hotels/:hotelName", async (req, res) => {
  const { hotelName } = req.params;

  const { data, error } = await findOneHotel({ name: hotelName });

  if (error) {
    console.log("DB error: fetching hotel by name", error);
    return res.status(500).json(fail("Internal server error"));
  }

  if (!data) {
    return res.status(404).json(fail("No hotel found"));
  }

  res.status(200).json(success("Hotel found", data));
});

app.get("/hotels/directory/:phoneNumber", async (req, res) => {
  const { phoneNumber } = req.params;

  const { data, error } = await findOneHotel({ phoneNumber: phoneNumber });

  if (error) {
    console.log("DB error: fetching hotel by phone", error);
    return res.status(500).json(fail("Internal server error"));
  }

  if (!data) {
    return res.status(404).json(fail("No hotel found"));
  }

  res.status(200).json(success("Hotel found", data));
});

app.get("/hotels/rating/:hotelRating", async (req, res) => {
  const { hotelRating } = req.params;

  const { data, error } = await findAllByFilter({ rating: hotelRating });

  if (error) {
    console.log("DB error: fetching hotels by rating", error);
    return res.status(500).json(fail("Internal server error"));
  }

  if (data.length === 0) {
    return res.status(404).json(fail("No hotel found"));
  }

  res.status(200).json(success("Hotels found", data));
});

app.get("/hotels/category/:hotelCategory", async (req, res) => {
  const { hotelCategory } = req.params;

  const { data, error } = await findAllByFilter({ category: hotelCategory });

  if (error) {
    console.log("DB error: fetching hotels by category", error);
    return res.status(500).json(fail("Internal server error"));
  }

  if (data.length === 0) {
    return res.status(404).json(fail("No hotel found"));
  }

  res.status(200).json(success("Hotels found", data));
});

(async () => {
  await initializeDB();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log("Server Listening on port :", PORT);
  });
})();
