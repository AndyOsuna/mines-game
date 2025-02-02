import { HEIGHT, SPOT, spotValueType, WIDTH } from "../config";
import Spot, { RawSpot } from "./spot-entity";

export default class GridEntity {
  public _grid: Spot[];

  constructor(
    readonly width: number = WIDTH,
    readonly height: number = HEIGHT
  ) {
    this._grid = [];
  }
  public setGrid(grid: Spot[]) {
    this.validateGridSize(grid);
    this._grid = grid;
  }

  public calcNeighBombs(i: number): number {
    let count = 0;
    this.mapArroundPos(i, (offset) => this._grid[offset].isBomb() && count++);
    return count;
  }

  public propagateVisibility(i: number): void {
    let currentSpot = this._grid[i];
    currentSpot = currentSpot.reveal().setValue(this.calcNeighBombs(i));
    this._grid[i] = currentSpot;
    if (currentSpot.isEmpty()) {
      this.mapArroundPos(
        i,
        (offset) =>
          !this._grid[offset].visible && this.propagateVisibility(offset)
      );
    }
  }

  public toggleFlag(i: number): void {
    this._grid[i] = this._grid[i].toggleFlag();
  }

  public printGrid() {
    let line = "";
    for (const spotIdx in this._grid) {
      const val = this.format(this._grid[spotIdx].value);
      line += val;
      if ((Number(spotIdx) + 1) % this.width === 0) {
        console.log(line);
        line = "";
      }
    }
  }

  public toRaw(): RawSpot[] {
    return this._grid.map((s) => s.toRaw());
  }

  /**
   * Recorre el área alrededor de `pos`, un área 3x3.
   */
  private mapArroundPos(pos: number, fn: (offsetPos: number) => void): void {
    for (let x = -1; x < 2; x++)
      for (let y = -1; y < 2; y++) {
        const offsetPos = pos + x + y * this.width;
        if (!this._grid[offsetPos]) continue;
        if (
          Math.floor(offsetPos / this.width) !==
          Math.floor((pos + y * this.width) / this.width)
        )
          continue;
        fn(offsetPos);
      }
  }

  private validateGridSize(grid: Spot[]) {
    if (grid.length != this.height * this.width)
      throw new Error(
        `Invalid grid size: ${grid.length} vs ${this.height * this.width}`
      );
  }

  private format(spot: spotValueType) {
    return formatSpot(spot).padEnd(3, " ");
  }
}
export function formatSpot(spot: spotValueType): string {
  let result = "";
  switch (spot) {
    case SPOT.BOMB:
      result = "B";
      break;
    case SPOT.EMPTY:
      result = "-";
      break;
    default:
      result = String(spot);
  }
  return result;
}
