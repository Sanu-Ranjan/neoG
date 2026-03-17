const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cuisine: [{ type: String, required: true }],
  location: { type: String, required: true },
  rating: { type: Number, required: true },
  reviews: [{ type: String, required: true }],
  website: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  openHours: { type: String, required: true },
  priceRange: { type: String, required: true },
  reservationsNeeded: { type: Boolean, required: true },
  isDeliveryAvailable: { type: Boolean, required: true },
  menuUrl: { type: String, required: true },
  photos: [{ type: String, required: true }],
});

const Restaurant = mongoose.model("Reataurants", restaurantSchema);

module.exports = {
  Restaurant,
};
