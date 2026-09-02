// Live poll with WebSockets. Express serves the page, ws handles live updates.
const express = require("express");
const http = require("http");
const { WebSocketServer } = require("ws");

const app = express();
app.use(express.static("client/dist")); // built React app (npm run build in client/)

// One HTTP server shared by Express and the WebSocket server.
// The browser connects to the same port, then upgrades to WebSocket.
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: "/ws" });

// STEP 4 (rooms): each poll is a "room". Key = poll id, value = { question, votes }.
const polls = {
  1: { question: "Tabs or spaces?", votes: { Tabs: 0, Spaces: 0 } },
  2: { question: "Coffee or tea?", votes: { Coffee: 0, Tea: 0 } },
};

// Send one message to every client that joined a given poll.
function broadcast(pollId) {
  const poll = polls[pollId];
  let connected = 0;
  wss.clients.forEach((client) => {
    if (client.pollId === pollId) connected++;
  });

  const message = JSON.stringify({
    type: "state",
    question: poll.question,
    votes: poll.votes,
    connected,
  });

  wss.clients.forEach((client) => {
    if (client.pollId === pollId && client.readyState === client.OPEN) {
      client.send(message);
    }
  });
}

// STEP 1: connection lifecycle
wss.on("connection", (socket, req) => {
  // Which poll does this client want? Comes from the URL: ws://host/ws?poll=1
  const url = new URL(req.url, "http://localhost");
  const pollId = url.searchParams.get("poll") || "1";
  if (!polls[pollId]) {
    socket.close();
    return;
  }

  socket.pollId = pollId; // tag the socket with its room
  console.log(`client joined poll ${pollId}`);
  broadcast(pollId); // STEP 3: everyone sees the new connected count

  // STEP 2: receive a vote, update state, push to everyone in the room
  socket.on("message", (raw) => {
    const data = JSON.parse(raw); // messages arrive as text, so parse first
    if (data.type === "vote" && polls[pollId].votes[data.option] !== undefined) {
      polls[pollId].votes[data.option]++;
      broadcast(pollId);
    }
  });

  socket.on("close", () => {
    console.log(`client left poll ${pollId}`);
    broadcast(pollId); // connected count goes down for the others
  });
});

server.listen(3000, () => console.log("http://localhost:3000?poll=1"));
