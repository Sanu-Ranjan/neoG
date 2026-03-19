const { initializeDB } = require("./db/db.connect");

const { Movie } = require("./models/movie.models");

const movie = {
  title: "Movie test",
  releaseYear: 2023,
  genre: "Other",
  director: "sadasdad",
  actors: ["actor1", "actor2", "actor3"],
  language: "English",
  rating: 7,
  plot: "plot plot plot",
  awards: "oscar",
  posterUrl: "www.asdadad.com",
  trailerUrl: "www.yt.com",
};

async function createMovie(movie) {
  await initializeDB();
  try {
    const newMovie = new Movie(movie);
    const savedMovie = await newMovie.save();
    console.log("New Movie Data", savedMovie);
  } catch (error) {
    console.log(error);
  }
}

createMovie(movie);
