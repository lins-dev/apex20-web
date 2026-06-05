import { create } from "zustand";

interface SessionState {
  campaignId: string | null;
  sceneId: string | null;
  connected: boolean;
  setCampaignId: (id: string | null) => void;
  setSceneId: (id: string | null) => void;
  setConnected: (status: boolean) => void;
  reset: () => void;
}

/**
 * Store global para gerenciar o estado da sessão ativa de jogo.
 * Controla qual campanha e cena estão em foco, além do status de conexão WS.
 */
export const useSessionStore = create<SessionState>((set) => ({
  campaignId: null,
  sceneId: null,
  connected: false,

  setCampaignId: (campaignId) => set({ campaignId }),
  setSceneId: (sceneId) => set({ sceneId }),
  setConnected: (connected) => set({ connected }),

  reset: () => set({ campaignId: null, sceneId: null, connected: false }),
}));
