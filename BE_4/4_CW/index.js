require("dotenv").config();
const { Movie } = require("../../BE_1_2/2.1_CW/models/movie.models");
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

const updateMovie = async (queryParam, updateData) => {
  try {
    const data = await Movie.findOneAndUpdate(queryParam, updateData, {
      new: true,
    });
    return dataObj.data(data);
  } catch (error) {
    return dataObj.error(error);
  }
};

app.post("/movies/:movieId", async (req, res) => {
  const { movieId } = req.params;

  const { data, error } = await updateMovie({ _id: movieId }, req.body);

  if (error) {
    console.log("Db error: updating movie", error);
    return res.status(500).json(fail("Internal server error"));
  }

  if (!data) {
    return res.status(404).json(fail("Movie not found"));
  }

  res.status(200).json(success("Movie updated", data));
});

(async () => {
  await initializeDB();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log("Server Listening on port :", PORT);
  });
})();
