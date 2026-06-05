import { describe, it, expect } from "vitest";
import { createActor } from "xstate";
import { tokenMovementMachine } from "./token-movement.machine";

describe("tokenMovementMachine", () => {
  it("should start in idle state", () => {
    const actor = createActor(tokenMovementMachine).start();
    expect(actor.getSnapshot().value).toBe("idle");
  });

  it("should transition from idle to dragging", () => {
    const actor = createActor(tokenMovementMachine).start();
    actor.send({ type: "DRAG_START" });
    expect(actor.getSnapshot().value).toBe("dragging");
  });

  it("should transition from dragging to pending on release", () => {
    const actor = createActor(tokenMovementMachine).start();
    actor.send({ type: "DRAG_START" });
    actor.send({ type: "DRAG_END" });
    expect(actor.getSnapshot().value).toBe("pending");
  });

  it("should return to idle from dragging if cancelled", () => {
    const actor = createActor(tokenMovementMachine).start();
    actor.send({ type: "DRAG_START" });
    actor.send({ type: "DRAG_CANCEL" });
    expect(actor.getSnapshot().value).toBe("idle");
  });

  it("should return to idle after server confirmation", () => {
    const actor = createActor(tokenMovementMachine).start();
    actor.send({ type: "DRAG_START" });
    actor.send({ type: "DRAG_END" });
    actor.send({ type: "SERVER_CONFIRM" });
    // transitions immediately back to idle due to 'after: 0'
    expect(actor.getSnapshot().value).toBe("idle");
  });

  it("should return to idle after server rejection (triggering rollback)", () => {
    const actor = createActor(tokenMovementMachine).start();
    actor.send({ type: "DRAG_START" });
    actor.send({ type: "DRAG_END" });
    actor.send({ type: "SERVER_REJECT" });
    // transitions immediately back to idle due to 'after: 0'
    expect(actor.getSnapshot().value).toBe("idle");
  });
});
