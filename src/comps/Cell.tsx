import { SPOT, Spot } from "../config";

export default function Cell({
  spot,
  update,
}: {
  spot: Spot;
  index: number;
  update: () => void;
}) {
  const isEmpty = spot.value === 0;
  const isBomb = spot.value === SPOT.BOMB;
  const hueColor = isBomb ? 0 : spot.value * (360 / 9) + 40;

  return (
    <div
      className={`cell ${isEmpty ? "" : ""}`}
      style={{
        color: `hsl(${hueColor},75%,50%)`,
        backgroundColor: `${!spot.visible ? "#ddd" : ""}`,
      }}
      onClick={update}
    >
      {!isEmpty && spot.visible && (isBomb ? "B" : spot.value)}
    </div>
  );
}
