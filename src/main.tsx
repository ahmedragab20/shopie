import "./index.css";
import "../arcatch.ts";
import router from "./router/index.tsx";
import React from "react";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
