import { useEffect, useRef, useState } from "react";

// Custom hook: owns the WebSocket, exposes the latest poll state and a vote() function.
export function useLivePoll(pollId) {
  const [poll, setPoll] = useState(null);       // { question, votes, connected }
  const [disconnected, setDisconnected] = useState(false);
  const socketRef = useRef(null);               // survives re-renders, no state change on set

  useEffect(() => {
    // ws:// or wss:// depending on the page, same host as the page
    const protocol = location.protocol === "https:" ? "wss" : "ws";
    const socket = new WebSocket(`${protocol}://${location.host}/ws?poll=${pollId}`);
    socketRef.current = socket;

    socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "state") setPoll(data);
    });
    socket.addEventListener("close", () => setDisconnected(true));

    // Cleanup: close the connection when the component unmounts or pollId changes.
    return () => socket.close();
  }, [pollId]);

  function vote(option) {
    socketRef.current?.send(JSON.stringify({ type: "vote", option })); // always a string
  }

  return { poll, disconnected, vote };
}
