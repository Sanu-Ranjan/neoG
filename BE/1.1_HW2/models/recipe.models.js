import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    servings: {
      type: Number,
    },

    prepTimeMinutes: {
      type: Number,
    },

    cookTimeMinutes: {
      type: Number,
    },

    ingredients: [
      {
        type: String,
      },
    ],

    directions: [
      {
        type: String,
      },
    ],

    notes: {
      type: String,
    },

    image: {
      type: String,
    },
  },
  { timestamps: true },
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
