import { createContext, useState } from "react";
import Spot from "../Spot";
import { gameStatusType } from "../config";

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

export function MinesProvider({ children }: { children: React.ReactNode }) {
  const [grid, setGrid] = useState<Spot[]>(Spot.createInitialGrid());
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
