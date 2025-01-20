import { expect, it } from "vitest";
import MakeGrid from "./make-grid";

const DEMO_WIDTH = 3,
  DEMO_HEIGHT = 4;

it("should have bombs", () => {
  const nbombs = (DEMO_WIDTH * DEMO_HEIGHT) / 6;
  const grid = new MakeGrid()
    .setSize(DEMO_WIDTH, DEMO_HEIGHT)
    .setBombs(nbombs)
    .build();

  const currentBombs = grid._grid.reduce(
    (acc, spot) => (spot.isBomb ? ++acc : acc),
    0
  );
  expect(currentBombs).toBe(nbombs);
});
