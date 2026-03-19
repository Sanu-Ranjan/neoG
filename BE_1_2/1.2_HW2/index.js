const { initializeDB } = require("./db/db.connect");

const fs = require("fs");
const jsondata = fs.readFileSync("books.json", "utf-8");
const booksData = JSON.parse(jsondata);

const { Book } = require("./models/books");

(async function () {
  try {
    await initializeDB();
    for (let bookObj of booksData) {
      const book = new Book({
        title: bookObj.title,
        author: bookObj.author,
        publishedYear: bookObj.publishedYear,
        genre: bookObj.genre,
        language: bookObj.language,
        country: bookObj.country,
        rating: bookObj.rating,
        summary: bookObj.summary,
        coverImageUrl: bookObj.coverImageUrl,
      });
      const data = await book.save();
      console.log(data);
    }
  } catch (error) {
    console.log("Fail to seed Data", error);
  }
})();
