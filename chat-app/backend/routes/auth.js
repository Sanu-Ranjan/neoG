const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "username and password are required" });
  }

  try {
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(409).json({ message: "username already taken" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashed });

    res.status(201).json({ _id: user._id, username: user.username });
  } catch (error) {
    res.status(500).json({ message: "could not register user" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "username and password are required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "invalid credentials" });
    }

    res.status(200).json({ _id: user._id, username: user.username });
  } catch (error) {
    res.status(500).json({ message: "could not log in" });
  }
});

module.exports = router;
