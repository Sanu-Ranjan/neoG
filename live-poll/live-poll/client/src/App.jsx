import { useLivePoll } from "./useLivePoll.js";

export default function App() {
  const pollId = new URLSearchParams(location.search).get("poll") || "1";
  const { poll, disconnected, vote } = useLivePoll(pollId);

  if (!poll) return <h1>Connecting...</h1>;

  const total = Object.values(poll.votes).reduce((a, b) => a + b, 0);

  return (
    <>
      <h1>{poll.question}</h1>
      <div className="status">
        {disconnected ? "Disconnected. Refresh to reconnect." : `${poll.connected} connected right now`}
      </div>

      {Object.entries(poll.votes).map(([name, count]) => (
        <div className="option" key={name}>
          <button onClick={() => vote(name)}>{name}</button>
          <div className="bar">
            <div style={{ width: total ? `${(count / total) * 100}%` : 0 }} />
          </div>
          <span className="count">{count}</span>
        </div>
      ))}

      <footer>
        Open another poll: <a href="?poll=1">poll 1</a> or <a href="?poll=2">poll 2</a>.
        Open this page in a second tab to see it update live.
      </footer>
    </>
  );
}
