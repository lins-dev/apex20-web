import { describe, it, expect, vi } from "vitest";
import { createHealthClient, createChatClient, createSessionClient } from "./clients";
import { createTransport } from "./transport";

// Mock the transport so tests don't need a real backend
vi.mock("./transport", () => ({
  createTransport: vi.fn(() => ({ __mocked: true })),
}));

describe("createHealthClient", () => {
  it("returns a client with the healthCheck method", () => {
    const transport = createTransport();
    const client = createHealthClient(transport);
    expect(typeof client.healthCheck).toBe("function");
  });

  it("uses the default transport when none is provided", () => {
    const client = createHealthClient();
    expect(client).toBeDefined();
    expect(createTransport).toHaveBeenCalled();
  });
});

describe("createChatClient", () => {
  it("returns a client with the sendMessage method", () => {
    const transport = createTransport();
    const client = createChatClient(transport);
    expect(typeof client.sendMessage).toBe("function");
  });

  it("uses the default transport when none is provided", () => {
    const client = createChatClient();
    expect(client).toBeDefined();
  });
});

describe("createSessionClient", () => {
  it("returns a client with the handshake method", () => {
    const transport = createTransport();
    const client = createSessionClient(transport);
    expect(typeof client.handshake).toBe("function");
  });

  it("uses the default transport when none is provided", () => {
    const client = createSessionClient();
    expect(client).toBeDefined();
  });
});
