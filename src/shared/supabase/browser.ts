import { createBrowserClient } from '@supabase/ssr';

export function createBrowserSupabase() {
  return createBrowserClient(
    process.env.SUPABASE_API_URL!,
    process.env.SUPABASE_API_PUBLIC_KEY!
  );
}


