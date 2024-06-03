import { useCallback, useEffect, useState } from "react";
import Spot from "../Spot";
import { HEIGHT, SPOT, WIDTH, gameStatusType } from "../config";
import { delay } from "../utils";

export function useMines() {
  const [grid, setGrid] = useState<Spot[]>(Spot.createInitialGrid());
  const [gameStatus, setGameStatus] = useState<gameStatusType>("PLAY");
  const [isFirstMove, setIsFirstMove] = useState(true);

  const reload = () => (
    setGrid(Spot.createInitialGrid()),
    setGameStatus("PLAY"),
    setIsFirstMove(true)
  );

  const calcNeighBombs = useCallback(
    (i: number, tempGrid?: Spot[]) => {
      let count = 0;
      tempGrid = tempGrid || grid;
      for (let y = -1; y < 2; y++)
        for (let x = -1; x < 2; x++) {
          const offset = i + x + y * WIDTH;
          // Si por sumarle x, se va del borde al otro y CAMBIA de fila, se saltea el conteo.
          if (!tempGrid[offset]) continue;
          if (
            Math.floor(offset / WIDTH) !== Math.floor((i + y * WIDTH) / WIDTH)
          )
            continue;

          if (tempGrid[offset].isBomb) count++;
        }
      return count;
    },
    [grid]
  );
  /* 
  const calcNeighFlags = (i: number) => {
    let count = 0;
    for (let y = -1; y < 2; y++)
      for (let x = -1; x < 2; x++) {
        const offset = i + x + y * WIDTH;
        // Si por sumarle x, se va del borde al otro y CAMBIA de fila, se saltea el conteo.
        if (!grid[offset]) continue;
        if (Math.floor(offset / WIDTH) !== Math.floor((i + y * WIDTH) / WIDTH))
          continue;

        if (grid[offset].flagged) count++;
      }
    return count;
  }; */

  const propagateVisibility = async (i: number, tempGrid: Spot[]) => {
    tempGrid[i] = tempGrid[i].reveal().setValue(calcNeighBombs(i, tempGrid));
    // setGrid((g) => g.map((g, id) => (id === i ? tempGrid[i] : g)));
    // setGrid((g) => ((g[i] = tempGrid[i]), g));
    setGrid([...tempGrid]);

    if (tempGrid[i].value === SPOT.EMPTY) {
      await delay(20);

      for (let x = -1; x < 2; x++)
        for (let y = -1; y < 2; y++) {
          // if (Math.abs(x) + Math.abs(y) !== 1) continue;
          const offset = i + x + y * WIDTH;
          if (!tempGrid[offset] || tempGrid[offset].visible) continue;
          if (
            Math.floor(offset / WIDTH) !== Math.floor((i + y * WIDTH) / WIDTH)
          )
            continue;
          propagateVisibility(offset, tempGrid);
        }
    }
  };

  const setVisible = async (i: number) => {
    if (gameStatus !== "PLAY") return;

    function moveBomb(i_: number, tempGrid: Spot[]) {
      const bombIndex = Math.floor(Math.random() * WIDTH * HEIGHT);
      if (bombIndex === i_) return moveBomb(i_, tempGrid);
      if (tempGrid[bombIndex].isBomb) return moveBomb(i_, tempGrid);
      tempGrid[bombIndex] = tempGrid[bombIndex].setValue(SPOT.BOMB);
      tempGrid[i_] = new Spot(calcNeighBombs(i_), true, tempGrid[i_].flagged);
    }
    const checkVictory = (tempGrid: Spot[]) =>
      tempGrid
        .filter((cell) => cell.value !== SPOT.BOMB)
        .every((cell) => cell.visible);

    const tmpGrid = Array.from(grid);
    if (!tmpGrid[i].visible) {
      if (grid[i].value === SPOT.BOMB && isFirstMove) {
        moveBomb(i, tmpGrid);
        console.log("Ups! una bomba, ahora aqui hay:", tmpGrid[i].value);
      }
      if (tmpGrid[i].isBomb /*  && !isFirstMove */) setGameStatus("GAMEOVER");
      // Si la celda está vacía, hay que propagar la visibilidad
      else if (tmpGrid[i].value === SPOT.EMPTY || isFirstMove) {
        await propagateVisibility(i, tmpGrid);
        // propagateAnimation(i);
      }
      if (checkVictory(tmpGrid)) setGameStatus("VICTORY");
    }
    // setGrid(tmpGrid);
    setIsFirstMove(false);
  };

  const setFlagged = (i: number) => {
    if (gameStatus !== "PLAY") return;
    if (!grid[i].visible)
      setGrid((gr) =>
        gr.map((cell, id) => (id === i ? cell.toggleFlag() : cell))
      );
  };
  useEffect(() => {
    if (gameStatus === "GAMEOVER") {
      setGrid((gr) => gr.map((cell) => cell.reveal()));
    }
  }, [gameStatus]);

  return { grid, gameStatus, setVisible, setFlagged, reload };
}
