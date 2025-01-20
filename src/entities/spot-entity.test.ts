import { describe, expect, it } from "vitest";
import Spot from "./spot-entity";

describe("Spot entity", () => {
  it("should have a function 'toRaw'", () => {
    const spot = new Spot();
    expect(typeof spot.toRaw).toBe("function");
  });

  it("should return a raw spot", () => {
    const spot = new Spot();
    const recievedSpot = spot.toRaw();
    const expectedSpot = { value: 0, visible: false, flagged: false };
    expect(recievedSpot).toEqual(expectedSpot);
  });
});
