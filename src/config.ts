export const SPOT = {
  EMPTY: 0,
  BOMB: -1,
};

export type spotValueType = (typeof SPOT)[keyof typeof SPOT];

export const WIDTH = 15;
export const HEIGHT = 15;
export const nBOMBS = Math.round((WIDTH * HEIGHT) / 6);
