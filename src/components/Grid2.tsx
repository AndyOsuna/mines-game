import MakeGrid from "../entities/make-grid";

const grid = new MakeGrid().setBombs(10).setSize(10, 10).build()._grid;

export default function Grid2() {
  return (
    <section
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${10},1fr)`,
        maxWidth: `${50 * 10}px`
      }}
    >
      {grid.map(() => (
        <div className="cell"></div>
      ))}
    </section>
  );
}
