import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { MinesProvider } from "./contexts/MinesContext.tsx";
import { PointsProvider } from "./contexts/PointsContext.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MinesProvider>
      <PointsProvider>
        <App />
      </PointsProvider>
    </MinesProvider>
  </React.StrictMode>
);
