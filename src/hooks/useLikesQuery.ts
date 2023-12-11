import { useQuery } from '@tanstack/react-query'
import useSupabase from './useSupabase'

function useLikesQuery(updateId: string) {
   const client = useSupabase()
   const queryKey = ['update', updateId]

   const queryFn = async () => {
      return client
         .from('likes')
         .select(
            `
      update_id,
      liker
    `
         )
         .eq('update_id', updateId)
         .throwOnError()
         .then((result) => result.data)
   }

   return useQuery({ queryKey, queryFn })
}

export default useLikesQuery
