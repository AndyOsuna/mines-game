import { useState } from "react";
import MakeGrid from "../entities/make-grid";
import Cell2 from "./Cell2";

const gridEntity = new MakeGrid().setBombs(30).setSize(20, 12).build();

export default function Grid2() {
  const [grid, setGrid] = useState(gridEntity.toRaw());
  // const [gameStatus, setGameStatus] = useState<gameStatusType>("PLAY");

  const handleSpotCliked = (pos: number) => () => {
    gridEntity.propagateVisibility(pos);
    setGrid([...gridEntity._grid]);
  };

  const handleFlagged = (pos: number) => () => {
    gridEntity.toggleFlag(pos);
    setGrid([...gridEntity._grid]);
  };

  return (
    <section
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${gridEntity.width},1fr)`,
        maxWidth: `${50 * gridEntity.width}px`
      }}
    >
      {grid.map((spot, pos) => (
        <Cell2
          key={pos}
          spot={spot}
          update={handleSpotCliked(pos)}
          flagger={handleFlagged(pos)}
        />
      ))}
    </section>
  );
}
