import { describe, it, expect } from "vitest";
import { createActor } from "xstate";
import { gameSessionMachine } from "./game-session.machine";

describe("gameSessionMachine", () => {
  it("should start in idle state", () => {
    const actor = createActor(gameSessionMachine).start();
    expect(actor.getSnapshot().value).toBe("idle");
  });

  it("should transition from idle to connecting", () => {
    const actor = createActor(gameSessionMachine).start();
    actor.send({ type: "CONNECT" });
    expect(actor.getSnapshot().value).toBe("connecting");
  });

  it("should transition from connecting to connected on success", () => {
    const actor = createActor(gameSessionMachine).start();
    actor.send({ type: "CONNECT" });
    actor.send({ type: "CONNECTED" });
    expect(actor.getSnapshot().value).toBe("connected");
  });

  it("should transition from connecting to disconnected on error", () => {
    const actor = createActor(gameSessionMachine).start();
    actor.send({ type: "CONNECT" });
    actor.send({ type: "ERROR" });
    expect(actor.getSnapshot().value).toBe("disconnected");
  });

  it("should transition from connected to reconnecting on error", () => {
    const actor = createActor(gameSessionMachine).start();
    actor.send({ type: "CONNECT" });
    actor.send({ type: "CONNECTED" });
    actor.send({ type: "ERROR" });
    expect(actor.getSnapshot().value).toBe("reconnecting");
  });

  it("should transition from connected to disconnected on manual disconnect", () => {
    const actor = createActor(gameSessionMachine).start();
    actor.send({ type: "CONNECT" });
    actor.send({ type: "CONNECTED" });
    actor.send({ type: "DISCONNECT" });
    expect(actor.getSnapshot().value).toBe("disconnected");
  });

  it("should transition from reconnecting back to connected on success", () => {
    const actor = createActor(gameSessionMachine).start();
    actor.send({ type: "CONNECT" });
    actor.send({ type: "CONNECTED" });
    actor.send({ type: "ERROR" }); // Enter reconnecting
    actor.send({ type: "CONNECTED" });
    expect(actor.getSnapshot().value).toBe("connected");
  });

  it("should transition from disconnected to connecting to allow retry", () => {
    const actor = createActor(gameSessionMachine).start();
    actor.send({ type: "CONNECT" });
    actor.send({ type: "ERROR" }); // Disconnected
    actor.send({ type: "CONNECT" });
    expect(actor.getSnapshot().value).toBe("connecting");
  });
});
