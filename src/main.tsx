import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { MinesProvider } from "./contexts/MinesContext.tsx";
import { PointsProvider } from "./contexts/PointsContext.tsx";
import Spot from "./entities/spot-entity.ts";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MinesProvider initialGrid={Spot.createInitialGrid()}>
      <PointsProvider>
        <App />
      </PointsProvider>
    </MinesProvider>
  </React.StrictMode>
);
