import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  calories: {
    type: Number,
  },
  carbohydrates: {
    type: Number,
  },
  protein: {
    type: Number,
  },
  fat: {
    type: Number,
  },
  image: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Food = mongoose.model("Food", foodSchema);

export default Food;
