import React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import MainRoutes from "@/routes/mainRoutes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MainRoutes />
    </BrowserRouter>
  </React.StrictMode>
);
