import { useEffect, useRef } from "react";
import { useGridStore } from "../store/grid-store";
import { Vec2 } from "@contracts/apex20/v1/grid_events_pb";

interface UseTokenDragOptions {
  tokenId: string;
  elementRef: React.RefObject<HTMLElement | null>;
  onDragEnd?: (tokenId: string, newPosition: Vec2) => void;
}

/**
 * Hook para gerenciar o drag-and-drop de um token no grid, com atualizações otimistas.
 */
export function useTokenDrag({ tokenId, elementRef, onDragEnd }: UseTokenDragOptions) {
  const { tokens, config, setTokenLock, updateTokenPosition } = useGridStore();
  const token = tokens[tokenId];

  // Mantemos referências mutáveis para evitar re-anexar os eventos (e perder o estado de isDragging) a cada pixel movido
  const stateRef = useRef({
    isDragging: false,
    startPointerX: 0,
    startPointerY: 0,
    startTokenX: 0,
    startTokenY: 0,
  });

  const latestTokenRef = useRef(token);
  const configRef = useRef(config);

  // Atualiza as refs a cada render sem recriar os listeners
  useEffect(() => {
    latestTokenRef.current = token;
    configRef.current = config;
  }, [token, config]);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const onPointerDown = (e: PointerEvent) => {
      const currentToken = latestTokenRef.current;
      if (!currentToken) return;

      // Impede arrastar se o token já estiver bloqueado por outro jogador (Soft Lock)
      if (currentToken.lockedBy && currentToken.lockedBy !== "local_user_id") return;

      if (e.button !== 0 && e.pointerType === "mouse") return;

      e.stopPropagation();
      stateRef.current.isDragging = true;
      el.setPointerCapture(e.pointerId);

      setTokenLock(tokenId, "local_user_id");

      stateRef.current.startPointerX = e.clientX;
      stateRef.current.startPointerY = e.clientY;
      stateRef.current.startTokenX = currentToken.position.x;
      stateRef.current.startTokenY = currentToken.position.y;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!stateRef.current.isDragging) return;

      const conf = configRef.current;

      const deltaPixelX = (e.clientX - stateRef.current.startPointerX) / conf.scale;
      const deltaPixelY = (e.clientY - stateRef.current.startPointerY) / conf.scale;

      const newGridX = stateRef.current.startTokenX + deltaPixelX / conf.cellSize;
      const newGridY = stateRef.current.startTokenY + deltaPixelY / conf.cellSize;

      const snapToGrid = e.shiftKey; 
      
      const finalX = snapToGrid ? Math.round(newGridX) : newGridX;
      const finalY = snapToGrid ? Math.round(newGridY) : newGridY;

      updateTokenPosition(tokenId, finalX, finalY);
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!stateRef.current.isDragging) return;

      stateRef.current.isDragging = false;
      el.releasePointerCapture(e.pointerId);

      setTokenLock(tokenId, undefined);

      const finalState = useGridStore.getState().tokens[tokenId];

      if (onDragEnd && finalState) {
        onDragEnd(tokenId, finalState.position);
      }
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
    };
  }, [tokenId, setTokenLock, updateTokenPosition, onDragEnd, elementRef]);

  return { isDragging: token?.lockedBy === "local_user_id" };
}
