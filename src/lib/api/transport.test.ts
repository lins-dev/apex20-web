import { describe, it, expect, vi, beforeEach } from "vitest";
import { createTransport } from "./transport";

describe("createTransport", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns a transport object", () => {
    const transport = createTransport();
    expect(transport).toBeDefined();
  });

  it("accepts a custom baseUrl", () => {
    const transport = createTransport("http://custom-api:9090");
    expect(transport).toBeDefined();
  });

  it("falls back to VITE_API_URL env var", () => {
    vi.stubEnv("VITE_API_URL", "http://env-api:8081");
    const transport = createTransport();
    expect(transport).toBeDefined();
  });
});
