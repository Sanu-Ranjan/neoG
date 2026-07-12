import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <>
    <App />
    <ToastContainer />
  </>,
);
