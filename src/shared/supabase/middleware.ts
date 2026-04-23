import {CookieOptions, createServerClient} from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request: request.clone(),
  })

  const supabase = createServerClient(
    process.env.SUPABASE_API_URL!,
    process.env.SUPABASE_API_PUBLIC_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request: request.clone(),
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser();
  supabaseResponse.headers.set('x-supabase-user-id', user?.id || '')

  return supabaseResponse
}
