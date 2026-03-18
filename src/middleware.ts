import { NextRequest, NextResponse } from "next/server";
import { LOCALES } from "@/i18n";
import { detectLocale } from "@/i18n/locale-detection";

export function middleware(request: NextRequest) {
  // 1. User's explicit choice (cookie) takes priority
  const cookieLocale = request.cookies.get("apex20-locale")?.value;
  const locale =
    cookieLocale && LOCALES.includes(cookieLocale as never)
      ? cookieLocale
      : detectLocale(request.headers.get("accept-language") ?? "");

  const response = NextResponse.next();
  response.headers.set("x-locale", locale);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
