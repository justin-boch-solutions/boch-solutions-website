import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// WICHTIG: Die Funktion heißt jetzt "proxy", genau wie die Datei!
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const locales = ['de', 'en'];
  const defaultLocale = 'de';

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};