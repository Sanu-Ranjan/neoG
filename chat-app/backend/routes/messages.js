const express = require("express");
const Message = require("../models/Message");

const router = express.Router();

// GET /messages?sender=sanu&receiver=ravi
router.get("/", async (req, res) => {
  const { sender, receiver } = req.query;

  if (!sender || !receiver) {
    return res.status(400).json({ message: "sender and receiver are required" });
  }

  try {
    const messages = await Message.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "could not fetch messages" });
  }
});

module.exports = router;
