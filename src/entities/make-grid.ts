import { SPOT } from "../config";
import GridEntity from "./grid-entity";
import Spot from "./spot-entity";

export default class MakeGrid {
  private width: number;
  private height: number;
  private bombs: number;

  constructor() {
    this.width = 0;
    this.height = 0;
    this.bombs = 0;
  }

  public setSize(width: number, height: number) {
    this.width = width;
    this.height = height;
    return this;
  }
  public setBombs(bombs: number) {
    this.bombs = Math.round(bombs);
    return this;
  }
  public build(): GridEntity {
    const grid = new GridEntity(this.width, this.height);
    grid.setGrid(this.initGrid());
    this.createBombs(grid);
    return grid;
  }

  private createBombs(grid: GridEntity) {
    for (let i = 0; i < this.bombs; i++) {
      const indexBomb = Math.floor(Math.random() * grid._grid.length);
      if (!grid._grid[indexBomb].isBomb)
        grid._grid[indexBomb] = new Spot(SPOT.BOMB);
      else i--;
    }
  }
  private initGrid(): Spot[] {
    const result = new Array(this.width * this.height).fill(new Spot());
    return result;
  }
}
