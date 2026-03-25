"use client";

import { useState, useCallback } from "react";

const TOKEN_COOKIE = "apex20-token";
const COOKIE_MAX_AGE = 60 * 60 * 24; // 24h

export interface TokenPayload {
  sub: string;
  is_admin: boolean;
  exp: number;
  iat: number;
}

// --- cookie helpers (usable outside React) ---

export function setToken(token: string): void {
  document.cookie = `${TOKEN_COOKIE}=${token}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

export function clearToken(): void {
  document.cookie = `${TOKEN_COOKIE}=; path=/; max-age=0`;
}

export function getToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${TOKEN_COOKIE}=`));
  return match ? match.split("=").slice(1).join("=") : null;
}

export function decodeTokenPayload(token: string): TokenPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64)) as TokenPayload;
  } catch {
    return null;
  }
}

// --- React hook ---

export interface AuthState {
  token: string | null;
  userId: string | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  signIn: (token: string) => void;
  signOut: () => void;
}

export function useAuth(): AuthState {
  const [token, setTokenState] = useState<string | null>(() => getToken());

  const payload = token ? decodeTokenPayload(token) : null;

  const signIn = useCallback((newToken: string) => {
    setToken(newToken);
    setTokenState(newToken);
  }, []);

  const signOut = useCallback(() => {
    clearToken();
    setTokenState(null);
  }, []);

  return {
    token,
    userId: payload?.sub ?? null,
    isAdmin: payload?.is_admin ?? false,
    isAuthenticated: token !== null,
    signIn,
    signOut,
  };
}
