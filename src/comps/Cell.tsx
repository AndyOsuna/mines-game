import { SPOT } from "../config";
import Spot from "../Spot";

export default function Cell({
  spot,
  index,
  update,
  flagger,
}: {
  spot: Spot;
  index?: number;
  update: () => void;
  flagger: () => void;
}) {
  const isEmpty = spot.value === SPOT.EMPTY;
  const isBomb = spot.value === SPOT.BOMB;
  const hueColor = isBomb && !spot.flagged ? 0 : spot.value * (360 / 9) + 40;

  return (
    <div
      className="cell"
      style={{
        color: `hsl(${hueColor},75%,50%)`,
        backgroundColor: `${!spot.visible ? "#ddd" : ""}`,
      }}
      onContextMenu={(e) => e.preventDefault()}
      onClick={update}
      onAuxClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        flagger();
      }}
    >
      <span>{index}</span>
      {!isEmpty && spot.visible
        ? isBomb
          ? "B"
          : spot.value
        : spot.flagged && <Flag />}
    </div>
  );
}

function Flag() {
  return "F";
}
