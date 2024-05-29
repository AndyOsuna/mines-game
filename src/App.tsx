import "./App.css";

import { useState } from "react";
import Spot from "./Spot";
import Cell from "./comps/Cell";
import { SPOT, WIDTH } from "./config";

function App() {
  // const [mode, setMode] = useState<"ADMIN" | "PLAYER">("ADMIN");
  const [gameStatus, setGameStatus] = useState<"PLAY" | "GAMEOVER">("PLAY");
  const [grid, setGrid] = useState<Spot[]>(Spot.createInitialGrid());

  const reset = () => setGrid(Spot.createInitialGrid());
  // console.log("Reload:", counter);
  // console.table(grid);

  // const createBombAt = (i: number) => {
  //   // const newGrid = [...grid];
  //   // newGrid[i].value = CELL.BOMB;
  //   setGrid((gr) =>
  //     gr.map((cell, id) => (id === i ? new Spot(SPOT.BOMB, true) : cell))
  //   );
  // };

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
    function propagateVisibility(i: number, tempGrid: Spot[]) {
      tempGrid[i] = tempGrid[i].toggleVisibility().setValue(calcNeighBombs(i));

      console.log("Spot en:", i, "\n", { ...tempGrid[i] });

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
    if (!grid[i].visible) {
      if (grid[i].value === SPOT.BOMB) {
        setGameStatus("GAMEOVER");
        console.log("Game over! :(");
        return;
      }

      const tempGrid = Array.from(grid).map((cell, id) =>
        id === i ? cell.toggleVisibility().setValue(calcNeighBombs(i)) : cell
      );
      // Si la celda está vacía, hay que propagar la visibilidad
      if (tempGrid[i].value === SPOT.EMPTY) propagateVisibility(i, tempGrid);

      setGrid(tempGrid);
    }
  };
  const setFlagged = (i: number) => {
    if (!grid[i].visible) {
      console.log("Flagged on:", i);
      setGrid((gr) =>
        gr.map((cell, id) => (id === i ? cell.toggleFlag() : cell))
      );
    } else console.log("No flag :)");
  };

  return (
    <section>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button onClick={reset}>Reset</button>
        <button
          onClick={() =>
            setGrid((gr) => gr.map((cell) => cell.toggleVisibility()))
          }
        >
          Toggle visilibity
        </button>
        {/* <button onClick={()=>createBombAt()}>Generate</button> */}
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
    </section>
  );
}

export default App;
