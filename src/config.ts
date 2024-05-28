export const SPOT = {
  EMPTY: 0,
  BOMB: -1,
};

export type spotValueType = (typeof SPOT)[keyof typeof SPOT];

export const WIDTH = 15;
export const HEIGHT = 10;
export const nBOMBS = Math.round((WIDTH * HEIGHT) / 8);

export class Spot {
  constructor(
    public value: spotValueType = SPOT.EMPTY,
    public visible: boolean = false,
    public flagged: boolean = false
  ) {}
  isBomb() {
    return this.value === SPOT.BOMB;
  }
  static createInitialGrid: () => Spot[] = () => {
    const array = Array(Math.round(WIDTH * HEIGHT)).fill(new Spot(SPOT.EMPTY));
    for (let i = 0; i < nBOMBS; i++) {
      const randomSpot = Math.floor(Math.random() * array.length);
      if (!array[randomSpot].isBomb()) array[randomSpot] = new Spot(SPOT.BOMB);
      else i--;
    }
    return array;
  };
}

export const createInitialGrid: () => Spot[] = () => {
  const array = Array(Math.round(WIDTH * HEIGHT)).fill(new Spot(SPOT.EMPTY));
  for (let i = 0; i < nBOMBS; i++) {
    const randomSpot = Math.floor(Math.random() * array.length);
    if (!array[randomSpot].isBomb()) array[randomSpot] = new Spot(SPOT.BOMB);
    else i--;
  }
  return array;
};
