const express = require("express");

const app = express();

app.use(express.json());

const cars = [
  { id: 1, make: "Toyota", model: "Corolla", year: 2018 },
  { id: 2, make: "Honda", model: "Civic", year: 2020 },
  { id: 3, make: "Ford", model: "Mustang", year: 2019 },
  { id: 4, make: "Hyundai", model: "Creta", year: 2021 },
  { id: 5, make: "Mahindra", model: "XUV700", year: 2022 },
  { id: 6, make: "Tata", model: "Nexon", year: 2023 },
  { id: 7, make: "BMW", model: "X5", year: 2017 },
  { id: 8, make: "Audi", model: "A6", year: 2019 },
  { id: 9, make: "Mercedes-Benz", model: "C-Class", year: 2020 },
  { id: 10, make: "Kia", model: "Seltos", year: 2021 },
];

app.get("/cars", (req, res) => {
  res.status(200).json(cars);
});

app.post("/cars/:id", (req, res) => {
  const carId = parseInt(req.params.id);
  const updatedCarData = req.body;

  const carToUpdate = cars.find((car) => car.id === carId);

  if (!carToUpdate) {
    res.status(404).json({ error: "Car not found." });
  } else {
    if (!updatedCarData.make || !updatedCarData.model || !updatedCarData.year) {
      res.status(400).json({ error: "Make, model and year are required." });
    } else {
      Object.assign(carToUpdate, updatedCarData);

      res.status(200).json({
        message: "Car data updated successfully.",
        car: carToUpdate,
      });
    }
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
