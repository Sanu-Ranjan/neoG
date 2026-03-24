const express = require("express");

const app = express();

app.use(express.json());

const albums = [
  { id: 1, title: "Abbey Road", artist: "The Beatles", year: 1969 },

  {
    id: 2,
    title: "The Dark Side of the Moon",
    artist: "Pink Floyd",
    year: 1973,
  },

  { id: 3, title: "Thriller", artist: "Michael Jackson", year: 1982 },
];

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Hello, This is Express Assignment Server." });
});

app.get("/albums", (req, res) => {
  res.status(200).json({ albums: albums });
});

app.post("/albums", (req, res) => {
  const { id, title, artist, year } = req.body;

  if (!id || !title || !artist || !year) {
    return res
      .status(400)
      .json({ error: "please include id, title, artist, year" });
  }

  albums.push({ id, title, artist, year });
  res.status(201).json({ message: "Album added" });
});

app.post("/albums/:id", (req, res) => {
  const { id } = req.params;
  const { title, artist, year } = req.body;

  if (!id || !title || !artist || !year) {
    return res
      .status(400)
      .json({ error: "please include id, title, artist, year" });
  }

  const album = albums.find((album) => album.id == id);

  if (!album) return res.send(404).json({ error: "Album is not found" });

  Object.assign(album, { id, title, artist, year });

  res.status(200).json({ message: "Album modified", data: album });
});

app.delete("/albums", (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ error: "Id required" });

  const index = albums.findIndex((album) => album.id == id);
  if (index === -1) return res.status(404).json({ message: "Album not found" });

  albums.splice(index, 1);

  res.status(200).json({ message: "Album deleted" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});
