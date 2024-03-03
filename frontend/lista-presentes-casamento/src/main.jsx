import React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import MainRoutes from "@/routes/mainRoutes";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
