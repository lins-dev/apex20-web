import { describe, it, expect } from "vitest";
// @ts-expect-error - index ainda não existe
import { t } from "./index";

describe("i18n Package", () => {
  it("should return the correct translation for English", () => {
    expect(t("common.welcome", "en")).toBe("Welcome to Apex20");
  });

  it("should return the correct translation for Portuguese", () => {
    expect(t("common.welcome", "pt-BR")).toBe("Bem-vindo ao Apex20");
  });
});
