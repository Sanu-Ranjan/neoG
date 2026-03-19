const app = require("express")();

app.get("/", (req, res) => {
  res.send("Hello from express server.");
});
app.get("/signin", (req, res) => {
  res.send("This is the Sign In page.");
});
app.get("/booking", (req, res) => {
  res.send("Book your tickets here.");
});
app.get("/clothing/kids", (req, res) => {
  res.send("This is the kids wear page.");
});
app.get("/blog", (req, res) => {
  res.send("This is the blog page.");
});

// 1. Write a GET route "/" which sends a message "Hello from express server.".

// 2. Write a GET route "/signin" which sends a message "This is the Sign In page.".

// 3. Write a GET route "/booking" which sends a message "Book your tickets here.".

// 4. Write a GET route "/clothing/kids" which sends a message "This is the kids wear page.".

// 5. Write a GET route "/blog" which sends a message "This is the blog page.".

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server listening on port : ", port));
