require("dotenv").config();
const express = require("express");
const { initializeDB } = require("../../BE_1_2/2.1_CW/db/db.connect");
const { Movie } = require("../../BE_1_2/2.1_CW/models/movie.models");

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

const createMovie = async (movieData) => {
  try {
    const newMovie = new Movie(movieData);
    const savedMovie = await newMovie.save();
    return dataObj.data(savedMovie);
  } catch (error) {
    return dataObj.error(error);
  }
};

app.post("/movies", async (req, res) => {
  const movieData = req.body;

  const { data, error } = await createMovie(movieData);

  if (error) {
    console.log("DB error: creating movie", error);
    return res.status(500).json(fail("Internal server error", error.message));
  }

  res.status(201).json(success("Movie created successfully", data));
});

(async () => {
  await initializeDB();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log("Server Listening on port :", PORT);
  });
})();
