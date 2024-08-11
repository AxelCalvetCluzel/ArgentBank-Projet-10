import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./assets/components/pages/Home"; 
import "../../Front-end/src/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <Home />
  </React.StrictMode>
);
