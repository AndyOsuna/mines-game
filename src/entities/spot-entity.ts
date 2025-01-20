import { HEIGHT, SPOT, WIDTH, nBOMBS, spotValueType } from "../config";
import { type Properties } from "../utils";

export default class Spot {
  static createInitialGrid = () => {
    const array = new Array(WIDTH * HEIGHT).fill(new Spot()) as Spot[];

    for (let i = 0; i < nBOMBS; i++) {
      const randomSpot = Math.floor(Math.random() * array.length);

      if (!array[randomSpot].isBomb()) array[randomSpot] = new Spot(SPOT.BOMB);
      else i--;
    }
    return array;
  };
  static createTestGrid = () => {
    let array = new Array(WIDTH * HEIGHT).fill(new Spot()) as Spot[];

    array = array.map((_, i) => {
      const n = (i % 12) - 1;
      switch (n) {
        case -1: // Bomb
          return new Spot(n, true);
        case 10: // Flag
          return new Spot(0, true, true);
        default: // Numbers
          return new Spot(n, true);
      }
    });

    return array;
  };

  constructor(
    public value: spotValueType = SPOT.EMPTY,
    public visible: boolean = false,
    public flagged: boolean = false
  ) {}

  isBomb() {
    return this.value === SPOT.BOMB;
  }
  isEmpty() {
    return this.value === SPOT.EMPTY;
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
    if (!this.isBomb()) return new Spot(n, this.visible, this.flagged);
    return new Spot(this.value, this.visible, this.flagged);
  }

  public toRaw(): Properties<Spot> {
    return {
      value: this.value,
      visible: this.visible,
      flagged: this.flagged
    };
  }
}
