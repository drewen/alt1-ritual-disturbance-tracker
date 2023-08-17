import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./index.html";
import "./appconfig.json";
import "./img/icon.png";
import "./img/github-mark-white.png";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
