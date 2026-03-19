const { initializeDb } = require("./db/db.connect");
const { Restaurant } = require("./models/restaurant.models");

// 1. Update by ID
const updateRestaurantById = async (id, newData) => {
  try {
    const data = await Restaurant.findByIdAndUpdate(id, newData, {
      returnDocument: "after",
    });
    console.log("Updated Restaurant (by ID):", data);
  } catch (error) {
    console.log("Error updating restaurant by ID:", error);
  }
};

// 2. Update by Name
const updateRestaurantByName = async (name, newData) => {
  try {
    const data = await Restaurant.findOneAndUpdate({ name }, newData, {
      returnDocument: "after",
    });
    console.log("Updated Restaurant (by Name):", data);
  } catch (error) {
    console.log("Error updating restaurant by name:", error);
  }
};

// 3. Update by Phone Number
const updateRestaurantByPhone = async (phoneNumber, newData) => {
  try {
    const data = await Restaurant.findOneAndUpdate({ phoneNumber }, newData, {
      returnDocument: "after",
    });
    console.log("Updated Restaurant (by Phone):", data);
  } catch (error) {
    console.log("Error updating restaurant by phone:", error);
  }
};

(async () => {
  await initializeDb();

  // 1. Update Yo China rating (use actual _id from DB)
  await updateRestaurantById("69b9235ef9cd6a7d0e4c8a5d", {
    rating: 4.1,
  });

  // 2. Update Somi → Som Sarovar
  await updateRestaurantByName("Somi", {
    name: "Som Sarovar",
  });

  // 3. Update delivery option by phone
  await updateRestaurantByPhone("+1288997392", {
    isDeliveryAvailable: true,
  });
})();
