const app = require("express")();

// 1. Write a GET route "/" which sends a message "Hello, Express JS".

// 2. Write a GET route "/products" which sends a message "Browse our products here.".

// 3. Write a GET route "/services" which sends a message "Explore our services.".

// 4. Write a GET route "/faq" which sends a message "Frequently Asked Questions.".

// 5. Write a GET route "/gallery" which sends a message "View our gallery.".

app.get("/", (req, res) => {
  res.send("Hello, Express JS");
});

app.get("/products", (req, res) => {
  res.send("Browse our products here.");
});

app.get("/services", (req, res) => {
  res.send("Explore our services.");
});

app.get("/faq", (req, res) => {
  res.send("Frequently Asked Questions.");
});

app.get("/gallery", (req, res) => {
  res.send("View our gallery");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server listening on port : ", port));
