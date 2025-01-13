import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ActiveNavProvider } from "./context/ActiveNavContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ActiveNavProvider>
      <App />
    </ActiveNavProvider>
  </React.StrictMode>
);
