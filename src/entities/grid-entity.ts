import Spot from "../Spot";
import { HEIGHT, SPOT, spotValueType, WIDTH } from "../config";

export default class GridEntity {
  public _grid: Spot[];

  constructor(
    readonly width: number = WIDTH,
    readonly height: number = HEIGHT
  ) {
    this._grid = Spot.createTestGrid();
  }
  public setGrid(grid: Spot[]) {
    this._grid = grid;
  }

  public calcNeighBombs(i: number): number {
    let count = 0;
    for (let y = -1; y < 2; y++)
      for (let x = -1; x < 2; x++) {
        const offset = i + x + y * this.width;
        // Si por sumarle x, se va del borde al otro y CAMBIA de fila, se saltea el conteo.
        if (!this._grid[offset]) continue;
        if (
          Math.floor(offset / this.width) !==
          Math.floor((i + y * this.width) / this.width)
        )
          continue;

        if (this._grid[offset].isBomb) count++;
      }
    return count;
  }

  public propagateVisibility(i: number): void {
    let currentSpot = this._grid[i];
    currentSpot = currentSpot.reveal().setValue(this.calcNeighBombs(i));
    this._grid[i] = currentSpot;

    if (currentSpot.isEmpty) {
      for (let x = -1; x < 2; x++)
        for (let y = -1; y < 2; y++) {
          // if (Math.abs(x) + Math.abs(y) !== 1) continue;
          const offset = i + x + y * this.width;
          if (!this._grid[offset] || this._grid[offset].visible) continue;
          if (
            Math.floor(offset / this.width) !==
            Math.floor((i + y * this.width) / this.width)
          )
            continue;
          this.propagateVisibility(offset);
        }
    }
  }

  public printGrid() {
    if (this._grid.length != this.height * this.width)
      throw new Error(
        `Invalid grid size: ${this._grid.length} vs ${this.height * this.width}`
      );
    let line = "";
    for (const spotIdx in this._grid) {
      const val = this.format(this._grid[spotIdx].value);
      line += val;
      if (Number(spotIdx) % WIDTH === 0) {
        console.log(line);
        line = "";
      }
    }
  }

  private format(spot: spotValueType) {
    let result: number | string = spot;
    switch (result) {
      case SPOT.BOMB:
        result = "B";
        break;
      case SPOT.EMPTY:
        result = "-";
        break;
    }
    return String(result).padEnd(3, " ");
  }
}
