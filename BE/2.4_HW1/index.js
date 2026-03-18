const { initializeDb } = require("./db/db.connect");
const { Restaurant } = require("./models/restaurant.models");

// 1. Delete by ID
const deleteRestaurantById = async (id) => {
  try {
    const deleted = await Restaurant.findByIdAndDelete(id);
    console.log("Deleted Restaurant (by ID):", deleted);
  } catch (error) {
    console.log("Error occurred while deleting restaurant:", error);
  }
};

// 2. Delete by Name
const deleteRestaurantByName = async (name) => {
  try {
    const deleted = await Restaurant.findOneAndDelete({ name });
    console.log("Deleted Restaurant (by Name):", deleted);
  } catch (error) {
    console.log("Error deleting restaurant:", error);
  }
};

(async () => {
  await initializeDb();

  // provide actual id from DB: 69b9235ef9cd6a7d0e4c8a5d
  await deleteRestaurantById("69b9235ef9cd6a7d0e4c8a5d");

  // provide actual name from the DB: Yo China
  await deleteRestaurantByName("Yo China");
})();
