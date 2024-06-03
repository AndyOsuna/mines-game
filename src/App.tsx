import "./App.css";

import Cell from "./components/Cell";
import Dialog from "./components/Dialog";
import { SPOT, WIDTH } from "./config";
import { useMines } from "./hooks/useMines";

function App() {
  const { grid, gameStatus, setVisible, setFlagged, reload } = useMines();

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
              // index={spot.value}
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
