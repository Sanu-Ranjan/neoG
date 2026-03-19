import mongoose from "mongoose";

const cameraSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
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
  features: [
    {
      type: String,
    },
  ],
  effectivePixels: {
    type: Number,
  },
  sensorType: {
    type: String,
  },
  wifi: {
    type: Boolean,
  },
  videoQuality: {
    type: String,
  },
  warrantyYears: {
    type: Number,
  },
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
  stockLeft: {
    type: Number,
  },
  delivery: {
    type: String,
  },
  image: {
    type: String,
  },
});

const Camera = mongoose.model("Camera", cameraSchema);

export default Camera;
