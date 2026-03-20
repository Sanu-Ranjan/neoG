const express = require("express");

const app = express();

const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
  },

  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
];
const todos = [{ id: 1, title: "Water the plants", day: "Saturday" }];
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello,Express server..." });
});

app.get("/books", (req, res) => {
  res.status(200).json({ books: books });
});

app.get("/todos", (req, res) => {
  res.status(200).json({ todos: todos });
});

app.post("/books", (req, res) => {
  const { id, title, author, year } = req.body;

  if (!id || !title || !author || !year) {
    return res.json({ error: "Please include book id, title, author, year" });
  }

  books.push({ id, title, author, year });

  res.status(201).json({ message: "Book added" });
});

app.post("/todos", (req, res) => {
  const { id, title, day } = req.body;
  if (!id || !title || !day) {
    return res.status(400).json({ error: "Please include id, title, day" });
  }

  todos.push({ id, title, day });
  res.status(201).json({ message: "Todo added" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("server listening on port : ", PORT));
