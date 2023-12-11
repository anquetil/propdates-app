import { getSupabaseBrowserClient } from '@/utils/supabaseClient'
import { useMemo } from 'react'

function useSupabase() {
   return useMemo(getSupabaseBrowserClient, [])
}

export default useSupabase
