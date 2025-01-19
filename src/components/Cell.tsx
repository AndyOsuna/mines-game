import { useEffect, useRef, useState } from "react";
import Spot from "../entities/spot-entity";

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

  const hueColor =
    s.visible && s.isBomb ? 40 : Math.max(20, s.value * (360 / 9) + 20);

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
        color: `lch(80% 100 ${hueColor})`
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
      {!s.isEmpty && s.visible ? (
        s.isBomb ? (
          <Bomb />
        ) : (
          s.value
        )
      ) : (
        s.flagged && <Flag />
      )}
    </div>
  );
}

function Bomb() {
  return "B";
}
function Flag() {
  return "F";
}
