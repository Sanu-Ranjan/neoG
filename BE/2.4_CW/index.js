const { initializeDb } = require("./db/db.connect");
const { Movie } = require("./models/movie.models");

const deleteMovieById = async (id) => {
  try {
    const deteled = await Movie.findByIdAndDelete(id);
  } catch (error) {
    console.log("Error occoured while deleting movies", console.error());
  }
};

const deleteMovieFromDb = async (movieData) => {
  try {
    const deleted = await Movie.findOneAndDelete(movieData);

    console.log("Sucessfully deleted", deleted);
  } catch (error) {
    console.log("Error deleting Movies", console.error());
  }
};

(async () => {
  await initializeDb();

  await deleteMovieById("69b57d537ebedb18a9a7b200");

  await deleteMovieFromDb({ director: "Rajkumar Hirani" });
})();
