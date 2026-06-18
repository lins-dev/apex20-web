import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { GridCanvas } from "./grid-canvas";
import { useGridStore } from "../store/grid-store";
import { Vec2 } from "@contracts/apex20/v1/grid_events_pb";

describe("GridCanvas", () => {
  beforeEach(() => {
    const store = useGridStore.getState();
    store.setConfig({ cellSize: 50, scale: 1, offsetX: 0, offsetY: 0 });
    store.setTokens([
      {
        tokenId: "t1",
        position: { x: 5, y: 5 } as Vec2,
        rotation: 0,
        scale: { x: 1, y: 1 } as Vec2,
        isVisible: true,
        label: "Hero",
      },
      {
        tokenId: "t2",
        position: { x: 10, y: 10 } as Vec2,
        rotation: 0,
        scale: { x: 1, y: 1 } as Vec2,
        isVisible: false, // Deve renderizar com opacidade
        label: "Hidden Trap",
      }
    ]);
  });

  it("should render grid pattern and tokens", () => {
    const { getByTitle } = render(<GridCanvas />);

    // Verifica se os tokens foram renderizados baseados em suas labels
    const heroToken = getByTitle("Hero");
    const trapToken = getByTitle("Hidden Trap");

    expect(heroToken).toBeInTheDocument();
    expect(trapToken).toBeInTheDocument();

    // O token não visível deve ter classe de opacidade
    expect(trapToken.className).toContain("opacity-50");
  });

  it("should update config offsetX/Y when panning the canvas", () => {
    const { container } = render(<GridCanvas />);
    const canvasEl = container.firstChild as HTMLElement;

    // Simula o PointerDown no grid
    fireEvent.pointerDown(canvasEl, { clientX: 100, clientY: 100 });

    // Simula o movimento do mouse para dar pan na tela
    fireEvent.pointerMove(window, { clientX: 250, clientY: 300 });

    // Verifica se o estado do grid foi atualizado
    const { config } = useGridStore.getState();
    expect(config.offsetX).toBe(150); // 250 - 100
    expect(config.offsetY).toBe(200); // 300 - 100

    // Finaliza o Pan
    fireEvent.pointerUp(window);
  });
});
