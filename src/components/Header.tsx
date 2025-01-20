import { useMines } from "../hooks/useMines";
import usePoints from "../hooks/usePoints";
import Dialog from "./Dialog";

export default function Header() {
  const { grid, gameStatus, reload } = useMines();
  const { victory, lost } = usePoints();

  return (
    <>
      {gameStatus === "GAMEOVER" && (
        <Dialog label="Has perdido :(" action={() => reload()} />
      )}
      {gameStatus === "VICTORY" && (
        <Dialog label="Has ganado!!" action={() => reload()} />
      )}
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button onClick={reload}>Reset</button>
        {grid.some((cell) => cell.isBomb()) && (
          <p>
            Cantidad de bombas: {grid.filter((cell) => cell.isBomb()).length}
          </p>
        )}
        <p>ganados: {victory}</p>
        <p>perdidos: {lost}</p>
      </div>
    </>
  );
}
