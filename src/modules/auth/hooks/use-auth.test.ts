import { describe, it, expect, beforeEach } from "vitest";
import { setToken, clearToken, getToken, decodeTokenPayload } from "./use-auth";

// jsdom provides document.cookie
beforeEach(() => {
  // clear cookie between tests
  document.cookie = "apex20-token=; path=/; max-age=0";
});

describe("setToken / getToken", () => {
  it("stores and retrieves the token from cookie", () => {
    setToken("my.jwt.token");
    expect(getToken()).toBe("my.jwt.token");
  });

  it("returns null when no token is set", () => {
    expect(getToken()).toBeNull();
  });
});

describe("clearToken", () => {
  it("removes the token from cookie", () => {
    setToken("my.jwt.token");
    clearToken();
    expect(getToken()).toBeNull();
  });
});

describe("decodeTokenPayload", () => {
  it("decodes a valid JWT payload", () => {
    // Header: {"alg":"RS256","typ":"JWT"}
    // Payload: {"sub":"user-123","is_admin":false,"exp":9999999999}
    const header = btoa(JSON.stringify({ alg: "RS256", typ: "JWT" }))
      .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    const payload = btoa(JSON.stringify({ sub: "user-123", is_admin: false, exp: 9999999999 }))
      .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    const token = `${header}.${payload}.fakesig`;

    const result = decodeTokenPayload(token);
    expect(result).not.toBeNull();
    expect(result?.sub).toBe("user-123");
    expect(result?.is_admin).toBe(false);
  });

  it("returns null for a malformed token", () => {
    expect(decodeTokenPayload("not-a-token")).toBeNull();
    expect(decodeTokenPayload("")).toBeNull();
  });
});
