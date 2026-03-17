const { initializeDB } = require("./db/db.connect");

const { Movie } = require("./models/movie");

const searchOneMovie = async (searchParam) => {
  try {
    const movie = await Movie.findOne(searchParam);
    console.log(movie);
  } catch (error) {
    console.log(error);
  }
};

const searchAllMovie = async () => {
  try {
    const movies = await Movie.find();
    console.log(movies);
  } catch (error) {
    console.log(error);
  }
};

const searchAllMoviesByField = async (searchParam) => {
  try {
    const movies = await Movie.find(searchParam);
    console.log(movies);
  } catch (error) {
    console.log(error);
  }
};

(async function () {
  await initializeDB();
  console.log("Find one movie by title: 3 Idiots");
  await searchOneMovie({ title: "3 Idiots" });

  console.log("Find all movies");
  await searchAllMovie();

  console.log("Find all movie by director: Rajkumar Hirani");
  await searchAllMoviesByField({ director: "Rajkumar Hirani" });
})();
