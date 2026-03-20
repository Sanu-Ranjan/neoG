const express = require("express");

const app = express();

app.use(express.json());

const movies = [
  { id: 1, title: "Inception", director: "Christopher Nolan", year: 2010 },

  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: 1972,
  },
];

const items = [
  { id: 1, itemName: "Spoon", color: "Silver", quantity: 8 },

  { id: 2, itemName: "Fork", color: "Silver", quantity: 8 },
];

app.get("/", (req, res) => {
  res.status(200).json({ message: "Express server.." });
});

app.get("/movies", (req, res) => {
  res.status(200).json({ movies: movies });
});

app.get("/items", (req, res) => {
  res.status(200).json({ items: items });
});

app.post("/movies", (req, res) => {
  const { id, title, director, year } = req.body;
  if (!id || !title || !director || !year) {
    return res
      .status(400)
      .json({ Error: "Please include id, title, director, year" });
  }

  movies.push({ id, title, director, year });
  res.status(201).json({ message: "Movie added" });
});

app.post("/items", (req, res) => {
  const { id, itemName, color, quantity } = req.body;
  if (!id || !itemName || !color || !quantity) {
    return res
      .status(400)
      .json({ error: "Please include id, item name, color, quantity" });
  }

  items.push({ id, itemName, color, quantity });
  res.status(201).json({ message: "Item added" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server listening on port : ", PORT);
});
