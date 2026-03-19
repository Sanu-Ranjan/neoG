import mongoose from "mongoose";

const smartphoneSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
    },

    model: {
      type: String,
      required: true,
    },

    releaseYear: {
      type: Number,
      required: true,
    },

    operatingSystem: {
      type: String,
      enum: ["iOS", "Android", "Windows", "Other"],
    },

    displaySize: {
      type: String,
    },

    storage: {
      type: String,
    },

    ram: {
      type: String,
    },

    cameraSpecs: {
      megapixels: Number,
      lensType: String,
      features: [String],
    },

    batteryCapacity: {
      type: String,
    },

    connectivity: [
      {
        type: String,
      },
    ],

    price: {
      type: Number,
    },

    colorsAvailable: [
      {
        type: String,
      },
    ],

    features: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
);

const Smartphone = mongoose.model("Smartphone", smartphoneSchema);

export default Smartphone;
