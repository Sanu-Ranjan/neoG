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

const deleteMovie = async (queryParam) => {
  try {
    const data = await Movie.findOneAndDelete(queryParam);
    return dataObj.data(data);
  } catch (error) {
    return dataObj.error(error);
  }
};

app.delete("/movies/:movieId", async (req, res) => {
  const { movieId } = req.params;

  const { data, error } = await deleteMovie({ _id: movieId });

  if (error) {
    console.log("Db error: error deleting movie", error);
    return res.status(500).json(fail("Internal server error"));
  }

  if (!data) {
    return res.status(404).json(fail("Movie not found"));
  }

  res.status(200).json(success("Movie deleted", data));
});

(async () => {
  await initializeDB();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log("Server Listening on port :", PORT);
  });
})();
