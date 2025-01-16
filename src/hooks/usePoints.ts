import { useContext } from "react";
import { PointsContext } from "../contexts/PointsContext";

export default function usePoints() {
  const { lost, victory, setLost, setVictory } = useContext(PointsContext);

  const addVictory = () => setVictory((v) => v + 1);
  const addLost = () => setLost((v) => v + 1);

  return { lost, victory, addLost, addVictory };
}
