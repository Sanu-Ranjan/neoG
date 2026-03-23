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
  res.status(200).json({ message: "Hello, from Express Server." });
});

app.get("/books", (req, res) => {
  res.status(200).json({ books: books });
});

app.post("/books", (req, res) => {
  const { id, make, author, year } = req.body;
  if (!id || !make || !author || !year) {
    return res
      .status(401)
      .json({ error: "Please provide id, make, author, year" });
  }

  books.push({ id, make, model, year });
  res.status(201).json({ message: "book added successfully" });
});

app.delete("/books/:id", (req, res) => {
  const id = req.params.id;
  const index = books.findIndex((book) => book.id == id);

  if (index == -1) {
    res.status(404).json({ error: "Book not found" });
  } else {
    books.splice(index, 1);
    res.status(200).json({ message: "Book deleted successfully" });
  }
});

app.get("/todos", (req, res) => {
  res.status(200).json({ todos: todos });
});

app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id == id);

  if (index == -1) {
    res.status(404).json({ error: "Todo not found" });
  } else {
    todos.splice(index, 1);
    res.status(200).json({ message: "Todo deleted successfully" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server listening on port : ", PORT);
});
