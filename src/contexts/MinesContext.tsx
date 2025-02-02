import { createContext, useState } from "react";
import { gameStatusType } from "../config";
import Spot from "../entities/spot-entity";

interface ContextType {
  grid: Spot[];
  setGrid: React.Dispatch<React.SetStateAction<Spot[]>>;
  gameStatus: gameStatusType;
  setGameStatus: React.Dispatch<React.SetStateAction<gameStatusType>>;
  isFirstMove: boolean;
  setIsFirstMove: React.Dispatch<React.SetStateAction<boolean>>;
}
const defaultContext = {} as ContextType;

export const MinesContext = createContext<ContextType>(defaultContext);

export function MinesProvider({
  children,
  initialGrid
}: {
  children: React.ReactNode;
  initialGrid: Spot[];
}) {
  const [grid, setGrid] = useState<Spot[]>(initialGrid);
  const [gameStatus, setGameStatus] = useState<gameStatusType>("PLAY");
  const [isFirstMove, setIsFirstMove] = useState(true);
  return (
    <MinesContext.Provider
      value={{
        grid,
        setGrid,
        gameStatus,
        setGameStatus,
        isFirstMove,
        setIsFirstMove
      }}
    >
      {children}
    </MinesContext.Provider>
  );
}
