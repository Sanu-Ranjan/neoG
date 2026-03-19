const { initializeDb } = require("./db/db.connect");
const { Car } = require("./models/car.models");

const addCar = async (carData) => {
  try {
    const newCar = new Car(carData);
    const savedData = await newCar.save();
    console.log("Saved car: ", savedData);
  } catch (error) {
    console.log("Eroor adding new car to db: ", error);
  }
};

const viewAllCars = async () => {
  try {
    const cars = await Car.find();
    console.log("All cars: ", cars);
  } catch (error) {
    console.log("Error fetching all cars from db: ", error);
  }
};

// agr will be {field:value}
const findCars = async (queryPrarams) => {
  try {
    const cars = await Car.find(queryPrarams);
    console.log("Cars: ", cars);
  } catch (error) {
    console.log("Error fetching cars data: ", error);
  }
};

const updateCar = async (queryPrarams, newData) => {
  try {
    const updatedData = await Car.findOneAndUpdate(queryPrarams, newData, {
      returnDocument: "after",
    });
    console.log("Updated car: ", updatedData);
  } catch (error) {
    console.log("Error updatig cars ", error);
  }
};

const deleteCarById = async (id) => {
  try {
    const deleted = await Car.findByIdAndDelete(id);
    console.log("Deleted car:", deleted);
  } catch (error) {
    console.log("Error deleting car by id", error);
  }
};

const deleteCar = async (queryPraram) => {
  try {
    const deleted = await Car.findOneAndDelete(queryPraram);
    console.log(deleted);
  } catch (error) {
    console.log("Error deleting Car ", error);
  }
};

(async () => {
  await initializeDb();

  await addCar({
    brand: "Ford",
    model: "Mustang",
    year: 2019,
    bodyStyle: "Convertible",
    fuelType: "Gasoline",
    transmission: "Automatic",
    engine: "5.0L V8",
    mileage: 25000,
    color: "Red",
    price: 3500000,
    condition: "Used",
    description: "Exciting Ford Mustang convertible with powerful V8 engine.",
    photos: [
      "https://example.com/mustang-photo1.jpg",
      "https://example.com/mustang-photo2.jpg",
      "https://example.com/mustang-photo3.jpg",
    ],
  });

  await addCar({
    brand: "Honda",
    model: "Civic",
    year: 2018,
    bodyStyle: "Coupe",
    fuelType: "Gasoline",
    transmission: "Manual",
    engine: "1.5L Turbocharged Inline-4",
    mileage: 40000,
    color: "Black",
    price: 1800000,
    condition: "Used",
    description: "Sporty Civic coupe with low mileage and manual transmission.",
    photos: [
      "https://example.com/civic-photo1.jpg",
      "https://example.com/civic-photo2.jpg",
      "https://example.com/civic-photo3.jpg",
    ],
  });

  await viewAllCars();

  await findCars({ brand: "Ford" });

  await findCars({ color: "Black" });

  await updateCar({ model: "Corolla" }, { price: 2300000 });

  await updateCar({ model: "Model S" }, { condition: "Used" });

  await deleteCarById("69b7bbfeee8416a4c16fa836");

  await deleteCar({ bodyStyle: "Coupe" });
})();

//69b7bbfeee8416a4c16fa836
