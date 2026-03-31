import { describe, it, expect } from "vitest";

describe("@nivo packages availability", () => {
  it("imports @nivo/core without error", async () => {
    const core = await import("@nivo/core");
    expect(core).toBeDefined();
  });

  it("imports @nivo/bar without error", async () => {
    const bar = await import("@nivo/bar");
    expect(bar).toBeDefined();
  });

  it("imports @nivo/line without error", async () => {
    const line = await import("@nivo/line");
    expect(line).toBeDefined();
  });
});
