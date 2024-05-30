import "./App.css";

import { useState } from "react";
import Spot from "./Spot";
import Cell from "./comps/Cell";
import Dialog from "./comps/Dialog";
import { SPOT, WIDTH } from "./config";

function App() {
  // const [mode, setMode] = useState<"ADMIN" | "PLAYER">("ADMIN");
  const [gameStatus, setGameStatus] = useState<"PLAY" | "GAMEOVER" | "VICTORY">(
    "PLAY"
  );
  const [grid, setGrid] = useState<Spot[]>(Spot.createInitialGrid());

  const reload = () => (
    setGrid(Spot.createInitialGrid()), setGameStatus("PLAY")
  );

  const calcNeighBombs: (i: number) => number = (i) => {
    let count = 0;
    for (let y = -1; y < 2; y++)
      for (let x = -1; x < 2; x++) {
        const offset = i + x + y * WIDTH;
        // Si por sumarle x, se va del borde al otro y CAMBIA de fila, se saltea el conteo.
        if (!grid[offset]) continue;
        if (Math.floor(offset / WIDTH) !== Math.floor((i + y * WIDTH) / WIDTH))
          continue;

        if (grid[offset].value === SPOT.BOMB) count++;
      }
    return count;
  };

  const setVisible = (i: number) => {
    if (gameStatus !== "PLAY") return;
    function propagateVisibility(i: number, tempGrid: Spot[]) {
      tempGrid[i] = tempGrid[i].toggleVisibility().setValue(calcNeighBombs(i));

      if (tempGrid[i].value === SPOT.EMPTY) {
        for (let y = -1; y < 2; y++)
          for (let x = -1; x < 2; x++) {
            const offset = i + x + y * WIDTH;
            if (!tempGrid[offset]) continue;
            if (
              Math.floor(offset / WIDTH) !== Math.floor((i + y * WIDTH) / WIDTH)
            )
              continue;
            if (!tempGrid[offset].visible)
              propagateVisibility(offset, tempGrid);
          }
      }
    }
    const checkVictory = (tempGrid: Spot[]) =>
      tempGrid
        .filter((cell) => cell.value !== SPOT.BOMB)
        .every((cell) => cell.visible);

    if (!grid[i].visible) {
      const tempGrid = Array.from(grid).map((cell, id) =>
        id === i ? cell.toggleVisibility().setValue(calcNeighBombs(i)) : cell
      );

      if (grid[i].value === SPOT.BOMB) setGameStatus("GAMEOVER");
      // Si la celda está vacía, hay que propagar la visibilidad
      else if (tempGrid[i].value === SPOT.EMPTY)
        propagateVisibility(i, tempGrid);

      if (checkVictory(tempGrid)) setGameStatus("VICTORY");
      else console.log("Aun no has ganado");
      setGrid(tempGrid);
    }
  };
  const setFlagged = (i: number) => {
    if (gameStatus !== "PLAY") return;
    if (!grid[i].visible)
      setGrid((gr) =>
        gr.map((cell, id) => (id === i ? cell.toggleFlag() : cell))
      );
  };

  return (
    <main>
      {gameStatus === "GAMEOVER" && (
        <Dialog label="Has perdido :(" action={() => reload()} />
      )}
      {gameStatus === "VICTORY" && (
        <Dialog label="Has ganado" action={() => reload()} />
      )}
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button onClick={reload}>Reset</button>
        {grid.some((cell) => cell.value === SPOT.BOMB) && (
          <p>
            Cantidad de bombas:{" "}
            {grid.filter((cell) => cell.value === SPOT.BOMB).length}
          </p>
        )}
      </div>
      <section
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${WIDTH},1fr)`,
          width: `${50 * WIDTH}px`,
        }}
      >
        {grid.map((spot, i) => (
          <>
            <Cell
              key={i}
              // index={i}
              spot={spot}
              update={() => setVisible(i)}
              flagger={() => setFlagged(i)}
            />
          </>
        ))}
      </section>
    </main>
  );
}

export default App;
