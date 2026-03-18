import { describe, it, expect } from "vitest";
import { t } from "./index";

describe("i18n Package", () => {
  it("should return the correct translation for English", () => {
    expect(t("common.welcome", "en")).toBe("Welcome to Apex20");
  });

  it("should return the correct translation for Portuguese", () => {
    expect(t("common.welcome", "pt-br")).toBe("Bem-vindo ao Apex20");
  });

  it("should return the correct translation for Spanish", () => {
    expect(t("common.welcome", "es")).toBe("Bienvenido a Apex20");
  });

  it("should return the correct translation for French", () => {
    expect(t("common.welcome", "fr")).toBe("Bienvenue sur Apex20");
  });

  it("should support deep dot-notation keys", () => {
    expect(t("landing.nav.features", "en")).toBe("Features");
    expect(t("landing.nav.features", "pt-br")).toBe("Funcionalidades");
    expect(t("landing.nav.features", "es")).toBe("Funcionalidades");
    expect(t("landing.nav.features", "fr")).toBe("Fonctionnalités");
  });

  it("should return the key if not found", () => {
    expect(t("landing.nonexistent.key", "en")).toBe("landing.nonexistent.key");
  });
});
