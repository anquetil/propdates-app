import { createBrowserClient } from '@supabase/ssr'

import type { Database } from '../../database.types'

let client: ReturnType<typeof createBrowserClient<Database>> | undefined

export function getSupabaseBrowserClient() {
   if (client) {
      return client
   }
   client = createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
   )
   return client
}
