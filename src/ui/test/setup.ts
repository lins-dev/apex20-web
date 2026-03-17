import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// ADR-010: Cleanup after each test to ensure isolation
afterEach(() => {
  cleanup();
});
