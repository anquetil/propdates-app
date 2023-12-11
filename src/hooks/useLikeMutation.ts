import { useMutation } from '@tanstack/react-query'
import useSupabase from './useSupabase'
import { Address } from 'viem'

export function useLikeMutation(updateId: string, liker: Address) {
   const client = useSupabase()

   const mutationFn = async () => {
      return client
         .from('likes')
         .insert({ update_id: updateId, liker: liker })
         .throwOnError()
         .single()
         .then((result) => result.data)
   }
   return useMutation({ mutationFn })
}
