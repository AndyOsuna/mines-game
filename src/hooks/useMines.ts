import { useCallback, useContext, useEffect } from "react";
import Spot from "../Spot";
import { HEIGHT, SPOT, WIDTH } from "../config";
import { MinesContext } from "../contexts/MinesContext";
import { delay } from "../utils";
import usePoints from "./usePoints";

export function useMines() {
  const {
    grid,
    setGrid,
    gameStatus,
    setGameStatus,
    isFirstMove,
    setIsFirstMove
  } = useContext(MinesContext);
  const { addLost, addVictory } = usePoints();

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

    // Generar nuevo array para generar una nueva referencia de dicho array,
    // así se produce un rerrenderizado de React.
    setGrid([...tempGrid]);

    if (tempGrid[i].isEmpty) {
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
  function moveBomb(i_: number, tempGrid: Spot[]) {
    const bombIndex = Math.floor(Math.random() * WIDTH * HEIGHT);
    if (bombIndex === i_) return moveBomb(i_, tempGrid);
    if (tempGrid[bombIndex].isBomb) return moveBomb(i_, tempGrid);
    tempGrid[bombIndex] = tempGrid[bombIndex].setValue(SPOT.BOMB);
    tempGrid[i_] = new Spot(calcNeighBombs(i_), true, tempGrid[i_].flagged);
  }
  function checkVictory(tempGrid: Spot[]) {
    return tempGrid
      .filter((cell) => !cell.isBomb)
      .every((cell) => cell.visible);
  }
  const setVisible = async (i: number) => {
    if (gameStatus !== "PLAY") return;

    const tmpGrid = Array.from(grid);
    if (!tmpGrid[i].visible && !tmpGrid[i].flagged) {
      if (grid[i].isBomb && isFirstMove) {
        moveBomb(i, tmpGrid);
        console.log("Ups! una bomba, ahora aqui hay:", tmpGrid[i].value);
      }
      if (tmpGrid[i].isBomb && !isFirstMove) {
        setGameStatus("GAMEOVER");
        addLost();
      }
      // Si la celda está vacía, hay que propagar la visibilidad
      else if (tmpGrid[i].isEmpty || isFirstMove) {
        await propagateVisibility(i, tmpGrid);
        // propagateAnimation(i);
      }
      if (checkVictory(tmpGrid)) {
        setGameStatus("VICTORY");
        addVictory();
      }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStatus]);

  return { grid, gameStatus, setVisible, setFlagged, reload };
}
