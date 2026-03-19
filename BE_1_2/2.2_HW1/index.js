const { initializeDb } = require("./db/db.connect");
const { Restaurant } = require("./models/restaurant.models");

const addRestaurant = async (data) => {
  try {
    const newRes = new Restaurant({
      name: data.name,
      cuisine: data.cuisine,
      location: data.location,
      rating: data.rating,
      reviews: data.reviews,
      website: data.website,
      phoneNumber: data.phoneNumber,
      openHours: data.openHours,
      priceRange: data.priceRange,
      reservationsNeeded: data.reservationsNeeded,
      isDeliveryAvailable: data.isDeliveryAvailable,
      menuUrl: data.menuUrl,
      photos: data.photos,
    });

    const saved = await newRes.save();
    console.log("\n New Restaurant added \n", saved);
  } catch (error) {
    console.log("Failed to add data", error);
  }
};

const findAllRestaurants = async () => {
  try {
    const data = await Restaurant.find();
    console.log(`\n All Restaurants: \n \n ${data}`);
  } catch (error) {
    console.log(`error fetching restaurants data, error \n ${error}`);
  }
};

const findRestaurantsByQuery = async (queryParam) => {
  try {
    const data = await Restaurant.find(queryParam);
    console.log(`\n Restaurants Found: \n ${data}`);
  } catch (error) {
    console.log(`error fetching restaurants data, error \n ${error}`);
  }
};

const findOneRestaurantByQuery = async (queryParam) => {
  try {
    const data = await Restaurant.findOne(queryParam);
    console.log(`\n Restaurant Found: \n ${data}`);
  } catch (error) {
    console.log(`error fetching restaurants data, error \n ${error}`);
  }
};

(async () => {
  try {
    await initializeDb();
    await addRestaurant({
      name: "Somi",
      cuisine: ["Greek"],
      location: "11 Main Road, Gem",
      rating: 4.3,
      reviews: [],
      website: "https://somi-example.com",
      phoneNumber: "+1234997390",
      openHours: "Tue-Sun: 11:00 AM - 10:00 PM",
      priceRange: "$$ (11-30)",
      reservationsNeeded: false,
      isDeliveryAvailable: true,
      menuUrl: "https://somi-example.com/menu",
      photos: [
        "https://example.com/somi-photo1.jpg",
        "https://example.com/somi-photo2.jpg",
      ],
    });
    await addRestaurant({
      name: "Yo China",
      cuisine: ["Chinese", "Italian"],
      location: "MG Road, Bangalore",
      rating: 3.9,
      reviews: [],
      website: "https://yo-example.com",
      phoneNumber: "+1288997392",
      openHours: "Tue-Sun: 10:00 AM - 11:00 PM",
      priceRange: "$$$ (31-60)",
      reservationsNeeded: true,
      isDeliveryAvailable: false,
      menuUrl: "https://yo-example.com/menu",
      photos: [
        "https://example.com/yo-photo1.jpg",
        "https://example.com/yo-photo2.jpg",
        "https://example.com/yo-photo3.jpg",
      ],
    });
    await findAllRestaurants();
    await findOneRestaurantByQuery({ name: "New Restaurant" });
    await findRestaurantsByQuery({ reservationsNeeded: true });
    await findRestaurantsByQuery({ isDeliveryAvailable: true });
    await findOneRestaurantByQuery({ phoneNumber: "+1288997392" });
    await findOneRestaurantByQuery({ cuisine: "Italian" });
  } catch (error) {
    console.log("error, ", error);
  }
})();
