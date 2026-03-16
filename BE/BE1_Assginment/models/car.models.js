const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    bodyStyle: { type: String, required: true },
    fuelType: {
      type: String,
      enum: ["Gasoline", "Diesel", "Electric", "Hybrid", "Other"],
      required: true,
    },
    transmission: {
      type: String,
      enum: ["Manual", "Automatic", "Other"],
      required: true,
    },
    engine: { type: String, required: true },
    mileage: { type: Number, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true },
    condition: { type: String, enum: ["New", "Used"], required: true },
    description: { type: String, required: true },
    photos: [{ type: String, required: true }],
    inMarket: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Car = mongoose.model("Car", carSchema);

module.exports = {
  Car,
};
// brand (String): The brand of the car. This field is required.
// model (String): The model of the car. This field is required.
// year(Number): Year the car was released. This field is required.
// bodyStyle(String): The style of the car. This field is required.
// fuelType(String): Fuel the car runs on. Choose from 'Gasoline', 'Diesel', 'Electric', 'Hybrid', 'Other'. This field is required.
// transmission(String): Choose from 'Manual', 'Automatic', 'Other'. This field is required.
// engine(String): Engine type of the car. This field is required.
// mileage(Number): Mileage the car gives. This field is required.
// color(String): Color of the car.This field is required.
// price(Number): Price of the car. This field is required.
// condition(String): Condition of the car. Choose from 'New', 'Used'. This field is required.
// description(String): Description about the car.
// photos(Array of String): Photos of the car.
// inMarket(Boolean): Is car available to buy in the market. Default is true.
// Include the option { timestamps: true } to automatically track the creation and update times of each car.
