import { useEffect, useRef, useState } from "react";
import { SPOT } from "../config";
import { type RawSpot } from "../entities/spot-entity";
import { ValueSpot } from "./Cell";

export default function Cell2({
  spot,
  index,
  update,
  flagger
}: {
  spot: RawSpot;
  index?: number;
  update: () => void;
  flagger: () => void;
}) {
  const [onTouchCounter, setOnTouchCounter] = useState(0);
  const intervalRef = useRef(0);

  const hueColor =
    spot.visible && spot.value == SPOT.BOMB
      ? 40
      : Math.max(20, spot.value * (360 / 9) + 20);

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
      className={`cell ${!spot.visible ? "disabled" : ""}`}
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
      <ValueSpot spot={spot} />
    </div>
  );
}
