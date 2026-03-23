const express = require("express");

const app = express();

app.use(express.json());

const cars = [{ id: 1, make: "Toyota", model: "Camry", year: 2022 }];

app.get("/cars", (req, res) => {
  res.status(200).json({ cars: cars });
});

app.post("/cars", (req, res) => {
  const { id, make, model, year } = req.body;
  if (!id || !make || !model || !year) {
    return res
      .status(401)
      .json({ error: "Please provide id, make, model, year" });
  }

  cars.push({ id, make, model, year });
  res.status(201).json({ message: "car added successfully" });
});

app.delete("/cars/:id", (req, res) => {
  const id = req.params.id;
  const index = cars.findIndex((car) => car.id == id);

  if (index == -1) {
    res.status(404).json({ error: "Car not found" });
  } else {
    cars.splice(index, 1);
    res.status(200).json({ message: "car deleted successfully" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server listening on port : ", PORT);
});
