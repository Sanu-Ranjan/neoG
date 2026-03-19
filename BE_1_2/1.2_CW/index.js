const { initializeDb } = require("./db/db.connect");
const Movie = require("./models/movie.models");
const fs = require("fs");

const jsonData = fs.readFileSync("movies.json", "utf-8");
const moviesData = JSON.parse(jsonData);

async function seedData() {
  try {
    await initializeDb();

    moviesData.forEach(
      ({
        title,
        releaseYear,
        genre,
        director,
        actors,
        language,
        country,
        rating,
        plot,
        awards,
        posterUrl,
        trailerUrl,
      }) => {
        const newMovie = new Movie({
          title,
          releaseYear,
          genre,
          director,
          actors,
          language,
          country,
          rating,
          plot,
          awards,
          posterUrl,
          trailerUrl,
        });
        newMovie.save();
      },
    );
  } catch (error) {
    console.log("Error seeding the data", error);
  }
}

seedData();
