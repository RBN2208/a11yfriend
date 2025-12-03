import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/shared/supabase/middleware'

export async function proxy(request: NextRequest) {
  const response = await updateSession(request)
  const requestUrl = new URL(request.url)
  const protectedRoutes = ['/account']

  const isProtectedRoute = protectedRoutes.some(route =>
    requestUrl.pathname === route || requestUrl.pathname.startsWith(`${route}/`)
  )

  if (isProtectedRoute) {
    // Get the session from the response headers
    const sessionHeader = response.headers.get('x-supabase-session')
    const session = sessionHeader ? JSON.parse(sessionHeader) : null

    if (!session) {
      const redirectUrl = new URL('/login', request.url)
      redirectUrl.searchParams.set('redirectTo', requestUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }
  }

  return response
}


export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    '/account/:path*'
  ],
}
