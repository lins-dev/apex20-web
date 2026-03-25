import { NextRequest, NextResponse } from "next/server";
import { LOCALES } from "@/i18n";
import { detectLocale } from "@/i18n/locale-detection";

const PROTECTED_PREFIXES = ["/dashboard", "/campaigns", "/vtt"];
const ADMIN_PREFIXES = ["/admin"];
const AUTH_PAGES = ["/login", "/signup"];

function decodeJwtPayload(token: string): { is_admin?: boolean } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Locale detection
  const cookieLocale = request.cookies.get("apex20-locale")?.value;
  const locale =
    cookieLocale && LOCALES.includes(cookieLocale as never)
      ? cookieLocale
      : detectLocale(request.headers.get("accept-language") ?? "");

  const response = NextResponse.next();
  response.headers.set("x-locale", locale);

  // 2. Auth guard
  const token = request.cookies.get("apex20-token")?.value;
  const isAuthPage = AUTH_PAGES.some((p) => pathname.startsWith(p));
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  const isAdmin = ADMIN_PREFIXES.some((p) => pathname.startsWith(p));

  // Redirect authenticated users away from auth pages
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect unauthenticated users from protected routes
  if (!token && (isProtected || isAdmin)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Restrict admin routes to is_admin users
  if (token && isAdmin) {
    const payload = decodeJwtPayload(token);
    if (!payload?.is_admin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
