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
  {
    id: 3,
    title: "The Shawshank Redemption",
    director: "Frank Darabont",
    year: 1994,
  },
];

const items = [
  { id: 1, itemName: "Spoon", color: "Silver", quantity: 8 },
  { id: 2, itemName: "Fork", color: "Silver", quantity: 8 },
  { id: 3, itemName: "Plate", color: "Off-White", quantity: 6 },
];

app.get("/", (req, res) => {
  res.status(200).json({ message: "Express server." });
});

app.post("/movies", (req, res) => {
  const { id, title, director, year } = req.body;

  if (!id || !title || !director || !year) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const movie = movies.find((m) => m.id === id);

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  movie.title = title;
  movie.director = director;
  movie.year = year;

  res.status(200).json(movie);
});

app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

app.post("/items", (req, res) => {
  const { id, itemName, color, quantity } = req.body;

  if (!id || !itemName || !color || !quantity) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const item = items.find((i) => i.id === id);

  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  item.itemName = itemName;
  item.color = color;
  item.quantity = quantity;

  res.status(200).json(item);
});

app.get("/items", (req, res) => {
  res.status(200).json(items);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
