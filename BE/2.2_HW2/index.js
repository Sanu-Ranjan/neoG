const { initializeDb } = require("./db/db.connect");
const { Hotel } = require("./models/hotel.models");

const addHotel = async (data) => {
  const newHotel = new Hotel(data);
  try {
    const saved = await newHotel.save();
    console.log("New Hotel added\n", saved);
  } catch (error) {
    console.log("Failed to add data\n", error);
  }
};

const findAllHotels = async () => {
  try {
    const hotels = await Hotel.find();
    console.log("All Hotels:\n", hotels);
  } catch (error) {
    console.log("error fetching all hotels\n", error);
  }
};

const findOneHotel = async (querryParams) => {
  try {
    const hotel = await Hotel.findOne(querryParams);
    console.log("Hotel found\n", hotel);
  } catch (error) {
    console.log("error fetching hotel\n", error);
  }
};

const findAllHotelsByQuerry = async (querryParams) => {
  try {
    const hotels = await Hotel.find(querryParams);
    console.log("Hotels:\n", hotels);
  } catch (error) {
    console.log("error fetching hotels\n", error);
  }
};

(async () => {
  try {
    await initializeDb();
    await addHotel({
      name: "Lake View",
      category: "Mid-Range",
      location: "124 Main Street, Anytown",
      rating: 3.2,
      reviews: [],
      website: "https://lake-view-example.com",
      phoneNumber: "+1234555890",
      checkInTime: "2:00 PM",
      checkOutTime: "12:00 PM",
      amenities: ["Laundry", "Boating"],
      priceRange: "$$$ (31-60)",
      reservationsNeeded: true,
      isParkingAvailable: false,
      isWifiAvailable: true,
      isPoolAvailable: false,
      isSpaAvailable: false,
      isRestaurantAvailable: false,
      photos: [
        "https://example.com/hotel1-photo1.jpg",
        "https://example.com/hotel1-photo2.jpg",
      ],
    });
    await addHotel({
      name: "Sunset Resort",
      category: "Resort",
      location: "12 Main Road, Anytown",
      rating: 4.0,
      reviews: [],
      website: "https://sunset-example.com",
      phoneNumber: "+1299655890",
      checkInTime: "2:00 PM",
      checkOutTime: "11:00 AM",
      amenities: [
        "Room Service",
        "Horse riding",
        "Boating",
        "Kids Play Area",
        "Bar",
      ],
      priceRange: "$$$$ (61+)",
      reservationsNeeded: true,
      isParkingAvailable: true,
      isWifiAvailable: true,
      isPoolAvailable: true,
      isSpaAvailable: true,
      isRestaurantAvailable: true,
      photos: [
        "https://example.com/hotel2-photo1.jpg",
        "https://example.com/hotel2-photo2.jpg",
      ],
    });
    await findAllHotels();
    await findOneHotel({ name: "Lake View" });
    await findAllHotelsByQuerry({ isParkingAvailable: true });
    await findAllHotelsByQuerry({ isRestaurantAvailable: true });
    await findAllHotelsByQuerry({ category: "Mid-Range" });
    await findAllHotelsByQuerry({ priceRange: "$$$$ (61+)" });
    await findAllHotelsByQuerry({ rating: 4 });
    await findOneHotel({ phoneNumber: "+1299655890" });
  } catch (error) {}
})();
