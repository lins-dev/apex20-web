import { useRef } from "react";
import { useGridStore, ClientToken } from "../store/grid-store";
import { useTokenDrag } from "../hooks/use-token-drag";
import { cn } from "@/ui/shared/utils";

interface GridTokenProps {
  token: ClientToken;
}

export function GridToken({ token }: GridTokenProps) {
  const { config } = useGridStore();
  const tokenRef = useRef<HTMLDivElement>(null);
  
  // Integração com a Movimentação Otimista
  const { isDragging } = useTokenDrag({
    tokenId: token.tokenId,
    elementRef: tokenRef,
    onDragEnd: (tokenId, position) => {
      // TODO: Conectar com o WebSocket para emitir um TokenDelta de atualização real.
      console.log(`[TokenMove] Broadcasting delta for ${tokenId}:`, position.toJson());
    }
  });

  const { cellSize } = config;

  // Calculamos a posição real na tela baseada no tamanho da célula e escala do grid
  const pixelX = token.position.x * cellSize;
  const pixelY = token.position.y * cellSize;
  const tokenSize = cellSize * (token.scale.x || 1);

  return (
    <div
      ref={tokenRef}
      className={cn(
        "absolute flex items-center justify-center rounded-full border-2 text-xs font-bold text-white shadow-md transition-shadow",
        token.lockedBy && !isDragging ? "ring-2 ring-amber-400 animate-pulse border-amber-300 z-50 scale-110" : "border-violet-400 z-10 hover:scale-105 hover:z-20 cursor-grab",
        isDragging && "cursor-grabbing z-50 scale-110 shadow-lg shadow-violet-500/50",
        !token.isVisible && "opacity-50"
      )}
      style={{
        width: tokenSize,
        height: tokenSize,
        transform: `translate(${pixelX}px, ${pixelY}px) rotate(${token.rotation}deg)`,
        backgroundColor: token.imageUrl ? "transparent" : "#8b5cf6",
        backgroundImage: token.imageUrl ? `url(${token.imageUrl})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        touchAction: "none" // Essencial para drag pointer events
      }}
      title={token.label}
    >
      {!token.imageUrl && token.label.substring(0, 2).toUpperCase()}
    </div>
  );
}
