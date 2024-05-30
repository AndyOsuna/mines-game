import { useEffect, useRef, useState } from "react";
import Spot from "../Spot";
import { SPOT } from "../config";

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
  const [c, sC] = useState(0);
  const intervalRef = useRef<number>(0);

  const isEmpty = s.value === SPOT.EMPTY;
  const hueColor =
    s.visible && s.isBomb ? 0 : Math.max(40, s.value * (360 / 9) + 40);

  const startC = () => {
    intervalRef.current = setInterval(() => {
      sC((prevC) => prevC + 1);
    }, 100);
  };
  const finishC = () => {
    clearInterval(intervalRef.current);
    sC(0);
  };

  useEffect(() => {
    if (c >= 3) {
      clearInterval(intervalRef.current);
      sC(0);
      flagger();
    }
  }, [c]);

  return (
    <div
      className={`cell ${!s.visible ? "disabled" : ""}`}
      style={{
        color: `hsl(${hueColor},75%,50%)`,
      }}
      onContextMenu={(e) => e.preventDefault()}
      onClick={update}
      onAuxClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        flagger();
      }}
      onTouchStart={() => startC()}
      onTouchEnd={() => finishC()}
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
