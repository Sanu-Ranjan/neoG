import { toast } from "react-toastify";
function App() {
  return (
    <>
      <div className="container">
        <h1>Rojgar app</h1>
        <button className="btn btn-primary" onClick={() => toast("working")}>
          click
        </button>
      </div>
    </>
  );
}

export default App;
