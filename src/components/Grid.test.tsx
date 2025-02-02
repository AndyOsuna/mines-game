import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { MinesProvider } from "../contexts/MinesContext";
import Spot from "../entities/spot-entity";
import Grid from "./Grid";

describe("Grid", () => {
  it("should render", () => {
    render(
      <MinesProvider initialGrid={[new Spot()]}>
        <Grid />
      </MinesProvider>
    );
  });

  it("should render a grid", () => {
    const demoGrid = [new Spot(0, true), new Spot(1, true), new Spot(2, true)];
    const component = render(
      <MinesProvider initialGrid={demoGrid}>
        <Grid />
      </MinesProvider>
    );
    component.getByText("1");

    /* Cuando un rerender, aveces se borra el grid.
    Con esto fuerzo a que chequee luego de un rerender */
    component.rerender(
      <MinesProvider initialGrid={demoGrid}>
        <Grid />
      </MinesProvider>
    );
    component.getByText("1");
  });

  it("should render a grid with a bomb", () => {
    const demoGrid = [new Spot(0, true), new Spot(-1, true), new Spot(2, true)];

    const component = render(
      <MinesProvider initialGrid={demoGrid}>
        <Grid />
      </MinesProvider>
    );
    component.getByText("B");
  });
});
