const { initializeDB } = require("./db/db.connect");

const { Hotel } = require("./models/hotel.models");

const newHotel = {
  name: "New Hotel",
  category: "Mid-Range",
  location: "123 Main Street, Frazer Town",
  rating: 4.0,
  reviews: [],
  website: "https://hotel-example.com",
  phoneNumber: "+1234567890",
  checkInTime: "2:00 PM",
  checkOutTime: "12:00 PM",
  amenities: ["Laundry", "Room Service"],
  priceRange: "$$$ (31-60)",
  reservationsNeeded: true,
  isParkingAvailable: true,
  isWifiAvailable: true,
  isPoolAvailable: false,
  isSpaAvailable: false,
  isRestaurantAvailable: true,
  photos: [
    "https://example.com/hotel-photo1.jpg",
    "https://example.com/hotel-photo2.jpg",
  ],
};

async function createMovie(restaurant) {
  await initializeDB();
  try {
    const newHotel = new Hotel(restaurant);
    const saved = await newHotel.save();
    console.log("New restaurant Data", saved);
  } catch (error) {
    console.log(error);
  }
}

createMovie(newHotel);
