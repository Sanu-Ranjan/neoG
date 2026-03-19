import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  cardName: {
    type: String,
    required: true,
  },
  cardHolder: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
    unique: true,
  },
  expiryDate: {
    type: String,
    required: true,
  },
  network: {
    type: String,
    default: "American Express",
  },
});

const Card = mongoose.model("Card", cardSchema);

export default Card;
