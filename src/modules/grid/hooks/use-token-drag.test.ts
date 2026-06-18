import { renderHook, act, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useTokenDrag } from "./use-token-drag";
import { useGridStore } from "../store/grid-store";
import { Vec2 } from "@contracts/apex20/v1/grid_events_pb";

describe("useTokenDrag", () => {
  beforeEach(() => {
    // Reset do store antes de cada teste
    const store = useGridStore.getState();
    store.setConfig({ cellSize: 40, scale: 1 });
    store.setTokens([
      {
        tokenId: "t1",
        position: { x: 10, y: 10 } as Vec2,
        rotation: 0,
        scale: { x: 1, y: 1 } as Vec2,
        isVisible: true,
        label: "Goblin",
      },
    ]);
  });

  it("should initialize with isDragging false", () => {
    const el = document.createElement("div");
    const { result } = renderHook(() =>
      useTokenDrag({ tokenId: "t1", elementRef: { current: el } })
    );

    expect(result.current.isDragging).toBe(false);
  });

  it("should not allow drag if token is locked by another user", () => {
    const store = useGridStore.getState();
    act(() => store.setTokenLock("t1", "other_user"));

    const el = document.createElement("div");
    el.setPointerCapture = vi.fn();

    const { result } = renderHook(() =>
      useTokenDrag({ tokenId: "t1", elementRef: { current: el } })
    );

    act(() => {
      fireEvent.pointerDown(el, { clientX: 100, clientY: 100 });
    });

    // Como estava locked, isDragging deve permanecer falso
    expect(result.current.isDragging).toBe(false);
    expect(el.setPointerCapture).not.toHaveBeenCalled();
  });

  it("should handle drag lifecycle optimistically", () => {
    const el = document.createElement("div");
    el.setPointerCapture = vi.fn();
    el.releasePointerCapture = vi.fn();
    
    const onDragEnd = vi.fn();

    const { result } = renderHook(() =>
      useTokenDrag({ tokenId: "t1", elementRef: { current: el }, onDragEnd })
    );

    // 1. Pointer Down
    act(() => { 
      fireEvent.pointerDown(el, { clientX: 100, clientY: 100, pointerId: 1 }); 
    });

    expect(result.current.isDragging).toBe(true);
    expect(useGridStore.getState().tokens["t1"].lockedBy).toBe("local_user_id");

    // 2. Pointer Move (movendo 80px no eixo X e 40px no Y. CellSize = 40)
    act(() => { 
      fireEvent.pointerMove(el, { clientX: 180, clientY: 140, pointerId: 1 }); 
    });

    const tokenState = useGridStore.getState().tokens["t1"];
    expect(tokenState.position.x).toBe(12); // 10 + 2
    expect(tokenState.position.y).toBe(11); // 10 + 1

    // 3. Pointer Up
    act(() => { 
      fireEvent.pointerUp(el, { pointerId: 1 }); 
    });

    expect(result.current.isDragging).toBe(false);
    expect(useGridStore.getState().tokens["t1"].lockedBy).toBeUndefined();
    
    // Confirma se o callback de emissão de rede foi chamado com a posição correta
    expect(onDragEnd).toHaveBeenCalledTimes(1);
    expect(onDragEnd.mock.calls[0][0]).toBe("t1");
    expect(onDragEnd.mock.calls[0][1].x).toBe(12);
  });
});
