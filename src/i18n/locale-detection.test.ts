import { describe, it, expect } from "vitest";
import { detectLocale } from "./locale-detection";

describe("detectLocale", () => {
  it("detects pt-br from exact header", () => {
    expect(detectLocale("pt-BR")).toBe("pt-br");
  });

  it("detects pt-br from language prefix", () => {
    expect(detectLocale("pt-PT,pt;q=0.9")).toBe("pt-br");
  });

  it("detects pt-br from full browser string", () => {
    expect(detectLocale("pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7")).toBe("pt-br");
  });

  it("detects en from en-US", () => {
    expect(detectLocale("en-US,en;q=0.9")).toBe("en");
  });

  it("detects en from bare en", () => {
    expect(detectLocale("en")).toBe("en");
  });

  it("detects es from es-ES", () => {
    expect(detectLocale("es-ES,es;q=0.9,en;q=0.8")).toBe("es");
  });

  it("detects es from es-MX", () => {
    expect(detectLocale("es-MX")).toBe("es");
  });

  it("detects fr from fr-FR", () => {
    expect(detectLocale("fr-FR,fr;q=0.9,en;q=0.8")).toBe("fr");
  });

  it("detects fr from fr-CA", () => {
    expect(detectLocale("fr-CA")).toBe("fr");
  });

  it("falls back to en for unknown language", () => {
    expect(detectLocale("de-DE,de;q=0.9")).toBe("en");
  });

  it("falls back to en for zh-CN", () => {
    expect(detectLocale("zh-CN,zh;q=0.9")).toBe("en");
  });

  it("falls back to en for empty string", () => {
    expect(detectLocale("")).toBe("en");
  });

  it("respects quality values — picks highest q match", () => {
    // de first but fr second; de not supported, so fr wins
    expect(detectLocale("de;q=1.0,fr;q=0.9,en;q=0.8")).toBe("fr");
  });

  it("handles lowercase Accept-Language header", () => {
    expect(detectLocale("pt-br")).toBe("pt-br");
  });
});
