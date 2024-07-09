import { useEffect, useRef, useState } from "react";
import Spot from "../Spot";
import { SPOT } from "../config";

export default function Cell({
  spot: s,
  index,
  update,
  flagger
}: {
  spot: Spot;
  index?: number;
  update: () => void;
  flagger: () => void;
}) {
  const [onTouchCounter, setOnTouchCounter] = useState(0);
  const intervalRef = useRef(0);

  const isEmpty = s.value === SPOT.EMPTY;
  const hueColor =
    s.visible && s.isBomb ? 0 : Math.max(40, s.value * (360 / 9) + 40);

  // Para marcar banderas en pantallas táctiles
  const startC = () => {
    intervalRef.current = setInterval(() => {
      setOnTouchCounter((prevC) => prevC + 1);
    }, 100);
  };
  const finishC = () => {
    clearInterval(intervalRef.current);
    setOnTouchCounter(0);
  };

  useEffect(() => {
    if (onTouchCounter >= 3) {
      clearInterval(intervalRef.current);
      setOnTouchCounter(0);
      flagger();
    }
  }, [onTouchCounter, flagger]);

  return (
    <div
      className={`cell ${!s.visible ? "disabled" : ""}`}
      style={{
        color: `hsl(${hueColor},75%,50%)`
      }}
      onContextMenu={(e) => e.preventDefault()}
      onClick={update}
      onAuxClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        flagger();
      }}
      onTouchStart={(e) => (e.stopPropagation(), e.preventDefault(), startC())}
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
