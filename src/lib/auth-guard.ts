import { redirect } from "@tanstack/react-router";
import { getToken } from "@/modules/auth/hooks/use-auth";

export function requireGuest() {
  if (getToken()) {
    throw redirect({ to: "/" });
  }
}

export function requireAuth(from?: string) {
  if (!getToken()) {
    throw redirect({
      to: "/login",
      search: from ? { from } : undefined,
    });
  }
}
