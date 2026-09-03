const express = require("express");
const User = require("../models/User");

const router = express.Router();

// GET /users?currentUser=sanu
router.get("/", async (req, res) => {
  const { currentUser } = req.query;

  try {
    const users = await User.find({ username: { $ne: currentUser } }).select(
      "username"
    );

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "could not fetch users" });
  }
});

module.exports = router;
