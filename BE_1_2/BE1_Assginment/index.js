const fs = require("fs");
const jsonData = fs.readFileSync("cars.json", "utf-8");
const cars = JSON.parse(jsonData);

const { initializeDb } = require("./db/db.connect");

const { Car } = require("./models/car.models");

(async function () {
  await initializeDb();

  try {
    for (let car of cars) {
      const newCar = new Car({
        brand: car.brand,
        model: car.model,
        year: car.year,
        bodyStyle: car.bodyStyle,
        fuelType: car.fuelType,
        transmission: car.transmission,
        engine: car.engine,
        mileage: car.mileage,
        color: car.color,
        price: car.price,
        condition: car.condition,
        description: car.description,
        photos: car.photos,
        inMarket: car.inMarket,
      });
      await newCar.save();
      console.log("Data seeded");
    }
  } catch (error) {
    console.log("Error occoured while seeding data", error);
  }
})();
