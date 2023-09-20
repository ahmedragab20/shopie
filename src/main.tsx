import "./index.css";
import router from "./router/index.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import "../arcatch.ts";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
