require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const Message = require("./models/Message");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const messageRoutes = require("./routes/messages");

const app = express();
const server = http.createServer(app);

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:3000";
const PORT = process.env.PORT || 5001;

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/messages", messageRoutes);

// socket.io rides on the same http server, not on express
const io = new Server(server, {
  cors: { origin: CLIENT_ORIGIN },
});

io.on("connection", (socket) => {
  console.log("connected:", socket.id);

  socket.on("send_message", async ({ sender, receiver, message }) => {
    if (!sender || !receiver || !message) return;

    try {
      const saved = await Message.create({ sender, receiver, message });

      // sent to everyone; the frontend decides if it belongs to the open chat
      io.emit("receive_message", {
        sender: saved.sender,
        receiver: saved.receiver,
        message: saved.message,
        createdAt: saved.createdAt,
      });
    } catch (error) {
      console.error("send_message failed", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("disconnected:", socket.id);
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("mongo connected");
    server.listen(PORT, () => console.log(`server on ${PORT}`));
  })
  .catch((error) => console.error("mongo connection failed", error));
