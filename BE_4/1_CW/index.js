const express = require("express");
require("dotenv").config();
const { initializeDB } = require("../../BE_1_2/2.1_CW/db/db.connect");
const { Movie } = require("../../BE_1_2/2.1_CW/models/movie.models");

const app = express();

app.use(express.json());

const findMovieByTitle = async (title) => {
  try {
    const movie = await Movie.findOne({ title: title });
    return { data: movie, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
};

const getAllMovies = async () => {
  try {
    const movies = await Movie.find();
    return { data: movies, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
};

const getMoviesByParams = async (queryParam) => {
  try {
    const movies = await Movie.find(queryParam);
    return { data: movies, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
};

app.get("/movies/:title", async (req, res) => {
  const title = req.params.title;

  const { data, error } = await findMovieByTitle(title);
  if (error) {
    console.log("db error: failed to fetch movie", error);
    return res.send(500).json({ error: "Internal server error" });
  }

  if (data) {
    res.status(200).json({ movies: data });
  } else {
    res.status(404).json({ error: "Movie not found" });
  }
});

app.get("/movies", async (req, res) => {
  const { data, error } = await getAllMovies();

  if (error) {
    console.log("db error: failed fetching all movies", error);
    return res.status(500).json({ error: "Internal server error" });
  }

  if (data.length > 0) {
    res.status(200).json({ movies: data });
  } else {
    res.status(404).json({ error: "No movies found" });
  }
});

app.get("/movies/director/:director", async (req, res) => {
  const director = req.params.director;

  const { data, error } = await getMoviesByParams({ director: director });

  if (error) {
    console.log("db error: failed to find movie by params", error);
    return res.send(500).json({ error: "Internal server error" });
  }

  if (data.length > 0) {
    res.status(200).json({ movies: data });
  } else {
    res.status(404).json({ error: "No movies found" });
  }
});

app.get("/movies/genre/:genre", async (req, res) => {
  const genre = req.params.genre;

  const { data, error } = await getMoviesByParams({ genre: genre });

  if (error) {
    console.log("db error: failed to find movie by params", error);
    return res.send(500).json({ error: "Internal server error" });
  }

  if (data.length > 0) {
    res.status(200).json({ movies: data });
  } else {
    res.status(404).json({ error: "No movies found" });
  }
});

(async () => {
  await initializeDB();

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log("Server listening on port : ", PORT);
  });
})();
