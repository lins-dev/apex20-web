import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { setToken, clearToken, getToken, decodeTokenPayload, useAuth } from "./use-auth";

// jsdom provides document.cookie
beforeEach(() => {
  // clear cookie between tests
  document.cookie = "apex20-token=; path=/; max-age=0";
  useAuth.setState({
    token: null,
    userId: null,
    isAdmin: false,
    isAuthenticated: false,
  });
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

describe("useAuth (Zustand)", () => {
  const generateMockToken = (sub: string, isAdmin: boolean = false) => {
    const payload = { sub, is_admin: isAdmin, exp: 9999999999, iat: 123 };
    const base64Payload = btoa(JSON.stringify(payload)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
    return `header.${base64Payload}.signature`;
  };

  it("should initialize unauthenticated if no token exists", () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.token).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.userId).toBeNull();
    expect(result.current.isAdmin).toBe(false);
  });

  it("should update store and cookie on signIn", () => {
    const { result } = renderHook(() => useAuth());
    const mockToken = generateMockToken("user-123", true);

    act(() => {
      result.current.signIn(mockToken);
    });

    expect(getToken()).toBe(mockToken);
    expect(result.current.token).toBe(mockToken);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.userId).toBe("user-123");
    expect(result.current.isAdmin).toBe(true);
  });

  it("should clear state and cookie on signOut", () => {
    const { result } = renderHook(() => useAuth());
    const mockToken = generateMockToken("user-123");

    act(() => {
      result.current.signIn(mockToken);
    });
    
    expect(result.current.isAuthenticated).toBe(true);

    act(() => {
      result.current.signOut();
    });

    expect(getToken()).toBeNull();
    expect(result.current.token).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.userId).toBeNull();
    expect(result.current.isAdmin).toBe(false);
  });
});
