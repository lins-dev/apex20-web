import { setup } from "xstate";

/**
 * Máquina de estado para gerenciar o ciclo de vida da conexão da sessão.
 * Segue o ADR-025 para garantir transições previsíveis entre estados de rede.
 */
export const gameSessionMachine = setup({
  types: {} as {
    events:
      | { type: "CONNECT" }
      | { type: "CONNECTED" }
      | { type: "DISCONNECT" }
      | { type: "ERROR" };
  },
}).createMachine({
  id: "gameSession",
  initial: "idle",
  states: {
    idle: {
      on: {
        CONNECT: "connecting",
      },
    },
    connecting: {
      on: {
        CONNECTED: "connected",
        ERROR: "disconnected",
      },
    },
    connected: {
      on: {
        DISCONNECT: "disconnected",
        ERROR: "reconnecting",
      },
    },
    reconnecting: {
      on: {
        CONNECTED: "connected",
        ERROR: "disconnected",
      },
    },
    disconnected: {
      on: {
        CONNECT: "connecting",
      },
    },
  },
});
