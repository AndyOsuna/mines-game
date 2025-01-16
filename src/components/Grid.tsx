import { WIDTH } from "../config";
import { useMines } from "../hooks/useMines";
import Cell from "./Cell";
export default function Grid() {
  const { grid, setVisible, setFlagged } = useMines();

  return (
    <section
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${WIDTH},1fr)`,
        maxWidth: `${50 * WIDTH}px`
      }}
    >
      {grid.map((spot, i) => (
        <Cell
          key={i}
          // index={spot.value}
          spot={spot}
          update={() => setVisible(i)}
          flagger={() => setFlagged(i)}
        />
      ))}
    </section>
  );
}
