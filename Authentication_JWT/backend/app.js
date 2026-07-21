const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());

app.use(express.json());

const users = [
  {
    name: "Sanu",
    email: "ranjan.code33@gmail.com",
    password: "12345",
  },
];

app.post("/login", (req, res) => {
  const { password, email } = req.body;

  let user = users.find((user) => user.email === email);

  if (!user) {
    return res.send("invalid email or password");
  }

  if (user.password === password) {
    const { name, email } = user;
    const secretKey = "learn_cookie"; //to be fetched from env var
    const token = jwt.sign({ name: name, email: email }, secretKey, {
      expiresIn: "24h",
    });

    const cookieAge = 2 * 60 * 1000;
    res.cookie("token", token, { maxAge: cookieAge, path: "/profile" });
    res.redirect("/profile");
    return res.send("User logged in");
  }
});

const auth = async (req, res, next) => {
  const token = req?.cookies?.token;

  if (!token) return res.send("No token: Please Login to continue");
  try {
    const user = await jwt.verify(token, "learn_cookie");
    req.user = user;
    next();
  } catch (error) {
    res.send("Please Login to continue");
    return res.redirect("/login");
  }
};

app.get("/profile", auth, (req, res) => {
  const { user } = req;

  return res.json({ profile: user });
});

app.listen(3000, () => {
  console.log("Server listening on port: 3000");
});
