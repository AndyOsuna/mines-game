import { HEIGHT, SPOT, WIDTH, nBOMBS, spotValueType } from "./config";

export default class Spot {
  constructor(
    public value: spotValueType = SPOT.EMPTY,
    public visible: boolean = false,
    public flagged: boolean = false
  ) {}

  isBomb() {
    return this.value === SPOT.BOMB;
  }
  toggleVisibility() {
    return new Spot(this.value, !this.visible);
  }
  toggleFlag() {
    return new Spot(this.value, this.visible, !this.flagged);
  }
  setValue(n: spotValueType) {
    return new Spot(n, this.visible, this.flagged);
  }

  static createInitialGrid: () => Spot[] = () => {
    const array = new Array(WIDTH * HEIGHT).fill(new Spot()) as Spot[];

    for (let i = 0; i < nBOMBS; i++) {
      const randomSpot = Math.floor(Math.random() * array.length);

      if (!array[randomSpot].isBomb()) array[randomSpot] = new Spot(SPOT.BOMB);
      else i--;
    }
    return array;
  };
}
