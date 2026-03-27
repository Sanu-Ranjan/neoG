require("dotenv").config();
const { Hotel } = require("../../BE_1_2/2.4_HW2/models/hotel.models");
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

const createHotel = async (hotelData) => {
  try {
    const data = await Hotel.create(hotelData);
    return dataObj.data(data);
  } catch (error) {
    return dataObj.error(error);
  }
};

app.post("/hotels", async (req, res) => {
  const hotelData = req.body;

  const { data, error } = await createHotel(hotelData);

  if (error) {
    console.log("Db error: error creating hotel", error);
    return res.status(500).json(fail("Internal server error", error.message));
  }

  res.status(201).json(success("Hotel created", data));
});

(async () => {
  await initializeDB();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log("Server Listening on port :", PORT);
  });
})();
