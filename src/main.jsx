import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home.jsx";
import Rules from "./routes/Rules.jsx";
import { GameContext } from "./GameContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/rules",
    element: <Rules />,
  },
  {
    path: "/game/normal",
    element: <GameContext wordLength={6} tries={6} />,
  },
  {
    path: "/game/hard",
    element: <GameContext wordLength={7} tries={5} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
