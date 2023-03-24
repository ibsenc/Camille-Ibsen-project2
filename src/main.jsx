import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeRoute from "./routes/HomeRoute.jsx";
import RulesRoute from "./routes/RulesRoute.jsx";
import { GameContext } from "./GameContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeRoute />,
  },
  {
    path: "/rules",
    element: <RulesRoute />,
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
