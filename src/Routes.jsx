import { createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import Home from "./Pages/Home";
import FlightSearch from "./Pages/FlightSearch";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/flightSearch",
        element: <FlightSearch />,
      },
    ],
  },
]);
