import { RawSpot } from "../entities/spot-entity";

export async function getGrid(): Promise<RawSpot[]> {
  return await fetch("http://localhost:3000/grid").then((res) => res.json());
}
