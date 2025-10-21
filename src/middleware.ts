import { match } from "@formatjs/intl-localematcher";
import { NextRequest, NextResponse } from "next/server";
import Negotiator from "negotiator";

const locales = ["en", "id"] as const;
const defaultLocale = "en";
const cookieName = "i18nlang";

// Normalize legacy tag: 'in' (Old Indonesian) -> 'id'
function normalizeLangTag(tag: string) {
  // in, in-ID -> id, id-ID
  return tag.replace(/^in(-|$)/i, "id$1");
}

function getLocale(request: NextRequest): (typeof locales)[number] {
  const cookieVal = request.cookies.get(cookieName)?.value;
  if (cookieVal && (locales as readonly string[]).includes(cookieVal)) {
    return cookieVal as (typeof locales)[number];
  }

  const acceptLang = request.headers.get("accept-language") ?? "";
  if (!acceptLang) return defaultLocale;

  const headers = { "accept-language": acceptLang };
  const raw = new Negotiator({ headers }).languages();
  const languages = raw.map(normalizeLangTag);

  return match(
    languages,
    locales as unknown as string[],
    defaultLocale
  ) as (typeof locales)[number];
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocalePrefix = locales.some(
    (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)
  );
  if (hasLocalePrefix) {
    return NextResponse.next();
  }

  const locale = getLocale(request);

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;

  const res = NextResponse.redirect(url); // default 307
  res.cookies.set({
    name: cookieName,
    value: locale,
    path: "/",
    maxAge: 60 * 60 * 24 * 180,
    sameSite: "lax",
  });
  return res;
}

export const config = {
  matcher: [
    // all, except _next, api, assets, sitemap, robots, favicon
    "/((?!_next|api|assets|sitemap\\.xml|robots\\.txt|favicon\\.ico).*)",
    "/",
  ],
};
