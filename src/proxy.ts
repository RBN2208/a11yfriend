import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/shared/supabase/middleware'
import createMiddleware from 'next-intl/middleware';
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  /**
   * Basic auth for non-production environments only (e.g. staging, preview).
   * In production, authentication is handled entirely by Supabase Auth.
   */
  const isProduction = process.env.NODE_ENV === 'production';
  const BASIC_AUTH_USER = process.env.BASIC_AUTH_USER;
  const BASIC_AUTH_PASSWORD = process.env.BASIC_AUTH_PASSWORD;

  if (!isProduction && BASIC_AUTH_USER && BASIC_AUTH_PASSWORD) {
    const unauthorized = () =>
      new NextResponse('Authentication required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="A11yfriend", charset="UTF-8"',
        },
      });

    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return unauthorized();
    }

    const [scheme, encoded] = authHeader.split(' ');
    if (scheme !== 'Basic' || !encoded) {
      return unauthorized();
    }

    let decoded = '';
    try {
      decoded = atob(encoded);
    } catch {
      return unauthorized();
    }

    const colonIndex = decoded.indexOf(':');
    const providedUser = colonIndex >= 0 ? decoded.slice(0, colonIndex) : decoded;
    const providedPass = colonIndex >= 0 ? decoded.slice(colonIndex + 1) : '';

    if (providedUser !== BASIC_AUTH_USER || providedPass !== BASIC_AUTH_PASSWORD) {
      return unauthorized();
    }
  }

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
    const userId = sessionResponse.headers.get('x-supabase-user-id');

    if (!userId) {
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

