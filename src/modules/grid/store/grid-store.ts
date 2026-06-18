import { create } from "zustand";
import { TokenDelta, Vec2 } from "@contracts/apex20/v1/grid_events_pb";

// Estado interno do Token que estende os dados do contrato (Delta)
// Adicionamos dados visuais client-side que não precisam de broadcast intenso.
export type ClientToken = Omit<TokenDelta, "position" | "scale" | "rotation"> & {
  tokenId: string; // Garantimos que tokenId não é opcional no client
  position: Vec2; // Garantimos que position não é opcional no client
  rotation: number;
  scale: Vec2;
  isVisible: boolean;
  
  // Propriedades visuais / de estado locais
  imageUrl?: string;
  label: string;
  lockedBy?: string; // ID do usuário que está arrastando (Soft lock)
};

type GridConfig = {
  cellSize: number;
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
  scale: number;
};

type GridState = {
  config: GridConfig;
  tokens: Record<string, ClientToken>;
  
  // Actions
  setConfig: (config: Partial<GridConfig>) => void;
  updateTokenPosition: (id: string, x: number, y: number) => void;
  setTokens: (tokens: ClientToken[]) => void;
  setTokenLock: (tokenId: string, lockedBy: string | undefined) => void;
};

export const useGridStore = create<GridState>((set) => ({
  config: {
    cellSize: 40,
    width: 2000,
    height: 2000,
    offsetX: 0,
    offsetY: 0,
    scale: 1,
  },
  tokens: {},

  setConfig: (newConfig) => 
    set((state) => ({ config: { ...state.config, ...newConfig } })),

  updateTokenPosition: (id, x, y) =>
    set((state) => {
      const token = state.tokens[id];
      if (!token) return state;
      
      const newPosition = { x, y } as Vec2;
      
      return {
        tokens: {
          ...state.tokens,
          [id]: { ...token, position: newPosition },
        },
      };
    }),

  setTokens: (tokensList) =>
    set(() => {
      const tokens: Record<string, ClientToken> = {};
      tokensList.forEach((t) => {
        tokens[t.tokenId] = t;
      });
      return { tokens };
    }),

  setTokenLock: (tokenId, lockedBy) =>
    set((state) => {
      const token = state.tokens[tokenId];
      if (!token) return state;

      return {
        tokens: {
          ...state.tokens,
          [tokenId]: { ...token, lockedBy },
        },
      };
    }),
}));
