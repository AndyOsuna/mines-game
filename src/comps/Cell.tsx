import { SPOT } from "../config";
import Spot from "../Spot";

export default function Cell({
  spot: s,
  index,
  update,
  flagger,
}: {
  spot: Spot;
  index?: number;
  update: () => void;
  flagger: () => void;
}) {
  const isEmpty = s.value === SPOT.EMPTY;
  const hueColor =
    s.visible && s.isBomb ? 0 : Math.max(40, s.value * (360 / 9) + 40);

  return (
    <div
      className="cell"
      style={{
        color: `hsl(${hueColor},75%,50%)`,
        backgroundColor: `${!s.visible ? "#ddd" : ""}`,
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
      {!isEmpty && s.visible
        ? s.isBomb
          ? "B"
          : s.value
        : s.flagged && <Flag />}
    </div>
  );
}

function Flag() {
  return "F";
}
