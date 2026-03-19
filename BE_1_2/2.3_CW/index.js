const { initializeDb } = require("./db/db.connect");
const { Movie } = require("./models/movie.models");

const updateMovieById = async (id, newData) => {
  try {
    const data = await Movie.findByIdAndUpdate(id, newData, {
      returnDocument: "after",
    });
    console.log("Updated Doc", data);
  } catch (error) {
    console.log("Error updating Movies", error);
  }
};

const updateMovie = async (querryParam, newData) => {
  try {
    const data = await Movie.findOneAndUpdate(querryParam, newData, {
      returnDocument: "after",
    });
    console.log("Updted doc:", data);
  } catch (error) {
    console.log("Error updating Movies", error);
  }
};

(async () => {
  await initializeDb();
  await updateMovieById("69b7e9c36653b7344d36087d", { title: "Inception" });
  await updateMovie(
    { title: "Kabhi Khushi Kabhie Gham" },
    { releaseYear: 2001 },
  );
})();
