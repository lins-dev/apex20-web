import { setup } from "xstate";

/**
 * Máquina de estado para gerenciar a movimentação de tokens no grid.
 * Implementa o padrão de UI Otimista com reconciliação do servidor (ADR-011).
 */
export const tokenMovementMachine = setup({
  types: {} as {
    events:
      | { type: "DRAG_START" }
      | { type: "DRAG_END" }
      | { type: "DRAG_CANCEL" }
      | { type: "SERVER_CONFIRM" }
      | { type: "SERVER_REJECT" };
  },
}).createMachine({
  id: "tokenMovement",
  initial: "idle",
  states: {
    idle: {
      on: {
        DRAG_START: "dragging",
      },
    },
    dragging: {
      on: {
        DRAG_END: "pending",
        DRAG_CANCEL: "idle",
      },
    },
    pending: {
      on: {
        SERVER_CONFIRM: "confirmed",
        SERVER_REJECT: "rejected",
      },
    },
    confirmed: {
      always: "idle",
    },
    rejected: {
      always: "idle",
    },
  },
});
