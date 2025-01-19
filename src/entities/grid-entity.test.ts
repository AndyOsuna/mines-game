import { beforeEach, describe, expect, it } from "vitest";
import { SPOT } from "../config";
import GridEntity from "./grid-entity";
import Spot from "./spot-entity";

const DEMO_WIDTH = 3,
  DEMO_HEIGHT = 2;
const demoGrid = [
  new Spot(SPOT.BOMB),
  new Spot(),
  new Spot(),
  new Spot(SPOT.BOMB),
  new Spot(),
  new Spot()
];
/* Example:
  [B , 0 , 0,
   B , 0 , 0] */

describe("Grid entity", () => {
  let grid: GridEntity;

  beforeEach(() => {
    grid = new GridEntity(DEMO_WIDTH, DEMO_HEIGHT);
    grid.setGrid(demoGrid);
  });

  it("should calculate bomb arround a spot", () => {
    expect(grid.calcNeighBombs(1)).toBe(2);
  });

  it("should reveals no-bomb spots", () => {
    grid.propagateVisibility(1);
    expect(grid._grid[1].visible).toBe(true);
  });

  it("when propagate, should reveals value of spot clicked", () => {
    grid.propagateVisibility(1);
    expect(grid._grid[1].value).toBe(2);
  });

  it("when propagate from empty spot, should reveals other values spots", () => {
    grid.propagateVisibility(2);
    expect(grid._grid[2].isEmpty).toBe(true);
    expect(grid._grid[utils.getBottomPosition(2)].isEmpty).toBe(true);
    expect(grid._grid[1].value).toBe(2);
    expect(grid._grid[4].value).toBe(2);
  });
});

const utils = {
  getBottomPosition(i: number) {
    return i + DEMO_WIDTH;
  }
};
