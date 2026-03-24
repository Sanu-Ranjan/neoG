const express = require("express");
const app = express();

app.use(express.json());

const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
  },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
  { id: 3, title: "1984", author: "George Orwell", year: 1949 },
];

const todos = [
  { id: 1, title: "Water the plants", day: "Saturday" },
  { id: 2, title: "Go for a walk", day: "Sunday" },
];

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello, From Express Server." });
});

app.post("/books", (req, res) => {
  const { id, title, author, year } = req.body;

  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  if (!id || !title || !author || !year) {
    return res.status(400).json({ error: "All fields are required" });
  }

  book.title = title;
  book.author = author;
  book.year = year;

  res.status(200).json({
    message: "Book updated successfully",
    book,
  });
});

app.get("/books", (req, res) => {
  res.status(200).json(books);
});

app.post("/todos", (req, res) => {
  const { id, title, day } = req.body;

  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: "Todo does not exist" });
  }

  if (!id || !title || !day) {
    return res.status(400).json({ error: "All fields are required" });
  }

  todo.title = title;
  todo.day = day;

  res.status(200).json({
    message: "Todo updated successfully",
    todo,
  });
});

app.get("/todos", (req, res) => {
  res.status(200).json(todos);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
