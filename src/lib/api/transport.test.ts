import { describe, it, expect } from "vitest";
import { createTransport } from "./transport";

describe("createTransport", () => {
  it("returns a transport object", () => {
    const transport = createTransport();
    expect(transport).toBeDefined();
  });

  it("accepts a custom baseUrl", () => {
    const transport = createTransport("http://custom-api:9090");
    expect(transport).toBeDefined();
  });

  it("falls back to NEXT_PUBLIC_API_URL env var", () => {
    process.env.NEXT_PUBLIC_API_URL = "http://env-api:8081";
    const transport = createTransport();
    expect(transport).toBeDefined();
    delete process.env.NEXT_PUBLIC_API_URL;
  });
});
