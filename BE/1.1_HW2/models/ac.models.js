import mongoose from "mongoose";

const acSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
    },

    model: {
      type: String,
      required: true,
    },

    capacity: {
      type: String,
    },

    starRating: {
      type: Number,
    },

    inverter: {
      type: Boolean,
    },

    wifiConnectivity: {
      type: Boolean,
      default: false,
    },

    features: [
      {
        type: String,
      },
    ],

    price: {
      type: Number,
      required: true,
    },

    originalPrice: {
      type: Number,
    },

    discountPercent: {
      type: Number,
    },

    rating: {
      type: Number,
    },

    ratingsCount: {
      type: Number,
    },

    reviewsCount: {
      type: Number,
    },

    warranty: {
      product: String,
      compressor: String,
      pcb: String,
    },

    offers: [
      {
        type: String,
      },
    ],

    image: {
      type: String,
    },
  },
  { timestamps: true },
);

const AirConditioner = mongoose.model("AirConditioner", acSchema);

export default AirConditioner;
