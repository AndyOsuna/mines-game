import { HEIGHT, SPOT, WIDTH, nBOMBS, spotValueType } from "./config";

export default class Spot {
  static createInitialGrid = () => {
    const array = new Array(WIDTH * HEIGHT).fill(new Spot()) as Spot[];

    for (let i = 0; i < nBOMBS; i++) {
      const randomSpot = Math.floor(Math.random() * array.length);

      if (!array[randomSpot].isBomb) array[randomSpot] = new Spot(SPOT.BOMB);
      else i--;
    }
    return array;
  };

  constructor(
    public value: spotValueType = SPOT.EMPTY,
    public visible: boolean = false,
    public flagged: boolean = false
  ) {}

  get isBomb() {
    return this.value === SPOT.BOMB;
  }
  toggleVisibility() {
    return new Spot(this.value, !this.visible, this.flagged);
  }
  reveal() {
    return new Spot(this.value, true, false);
  }
  toggleFlag() {
    return new Spot(this.value, this.visible, !this.flagged);
  }
  setValue(n: spotValueType) {
    if (!this.isBomb) return new Spot(n, this.visible, this.flagged);
    return new Spot(this.value, this.visible, this.flagged);
  }
}
