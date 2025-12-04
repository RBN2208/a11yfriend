import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/shared/supabase/middleware'
import createMiddleware from 'next-intl/middleware';
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  const intlResponse = intlMiddleware(request);

  const pathname = request.nextUrl.pathname;
  const localeMatch = pathname.match(/^\/(en|de)(\/|$)/);
  const locale = localeMatch ? localeMatch[1] : routing.defaultLocale;

  const protectedRoutes = ['/account'];

  const pathWithoutLocale = pathname.replace(/^\/(en|de)/, '') || '/';
  const isProtectedRoute = protectedRoutes.some(route =>
    pathWithoutLocale === route || pathWithoutLocale.startsWith(`${route}/`)
  );

  if (isProtectedRoute) {
    const sessionResponse = await updateSession(request);
    const sessionHeader = sessionResponse.headers.get('x-supabase-session');
    const session = sessionHeader ? JSON.parse(sessionHeader) : null;

    if (!session) {
      const redirectUrl = new URL(`/${locale}`, request.url);
      redirectUrl.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(redirectUrl);
    }

    sessionResponse.cookies.getAll().forEach(cookie => {
      intlResponse.cookies.set(cookie.name, cookie.value);
    });
  }

  return intlResponse;
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ],
}

