import { createContext, useState } from "react";

interface PointsContextType {
  lost: number;
  setLost: (value: number | ((prevState: number) => number)) => void;
  victory: number;
  setVictory: (value: number | ((prevState: number) => number)) => void;
}

const defaultPointsContext = {} as PointsContextType;
export const PointsContext =
  createContext<PointsContextType>(defaultPointsContext);

export function PointsProvider({ children }: { children: React.ReactNode }) {
  const [lost, setLost] = useState(0);
  const [victory, setVictory] = useState(0);

  return (
    <PointsContext.Provider value={{ lost, setLost, victory, setVictory }}>
      {children}
    </PointsContext.Provider>
  );
}
