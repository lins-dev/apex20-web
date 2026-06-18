import { useEffect, useRef } from "react";
import { useGridStore } from "../store/grid-store";
import { GridToken } from "./grid-token";

export function GridCanvas() {
  const { config, tokens, setConfig } = useGridStore();
  const containerRef = useRef<HTMLDivElement>(null);

  // Implementação simples de Pan (arrastar o grid inteiro)
  // Nota: Isso é apenas o pan da câmera, não move os tokens no banco de dados.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let isPanning = false;
    let startX = 0;
    let startY = 0;

    const onPointerDown = (e: PointerEvent) => {
      // Se clicou diretamente no grid (e não em um token), inicia o Pan
      if (e.target === el) {
        isPanning = true;
        startX = e.clientX - config.offsetX;
        startY = e.clientY - config.offsetY;
        el.style.cursor = "grabbing";
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isPanning) return;
      setConfig({
        offsetX: e.clientX - startX,
        offsetY: e.clientY - startY,
      });
    };

    const onPointerUp = () => {
      isPanning = false;
      el.style.cursor = "default";
    };

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [config.offsetX, config.offsetY, setConfig]);

  const cssVars = {
    "--grid-size": `${config.cellSize}px`,
    "--grid-major-size": `${config.cellSize * 5}px`,
    "--grid-offset-x": `${config.offsetX}px`,
    "--grid-offset-y": `${config.offsetY}px`,
    "--grid-scale": config.scale,
  } as React.CSSProperties;

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden bg-zinc-950 select-none touch-none"
      style={cssVars}
    >
      {/* Pattern do Grid de fundo */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundSize: "var(--grid-size) var(--grid-size), var(--grid-size) var(--grid-size), var(--grid-major-size) var(--grid-major-size), var(--grid-major-size) var(--grid-major-size)",
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px),
            linear-gradient(rgba(139, 92, 246, 0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.8) 1px, transparent 1px)
          `,
          backgroundPosition: "var(--grid-offset-x) var(--grid-offset-y)",
          transform: `scale(var(--grid-scale))`,
          transformOrigin: "0 0",
        }}
      />

      {/* Container Transformável onde os Tokens vivem */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          transform: `translate(var(--grid-offset-x), var(--grid-offset-y)) scale(var(--grid-scale))`,
          transformOrigin: "0 0",
        }}
      >
        <div className="relative pointer-events-auto">
          {Object.values(tokens).map((token) => (
            <GridToken key={token.tokenId} token={token} />
          ))}
        </div>
      </div>
    </div>
  );
}
