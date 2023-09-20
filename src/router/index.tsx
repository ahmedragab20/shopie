import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/home";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
];

export default createBrowserRouter(routes);
