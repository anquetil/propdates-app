import { Action } from '@/utils/types'
import { gql, useQuery } from '@apollo/client'
import { Address } from 'viem'

export function useGetActions(address: Address, enabled: boolean) {
   const query = gql`query actions {
      proposals(
         where:{
            or:[
               {and: [
                  {proposer:"${address}"},
                  {admin: "0x0000000000000000000000000000000000000000"}
               ]},
               {pendingAdmin:"${address}"}               
               {admin:"${address}"}
            ]
         }
      ){
         id
         title
         admin
         proposer
         transferPending
         pendingAdmin
         isCompleted
      }
   }`

   const { data, loading } = useQuery(query, {
      skip: !enabled,
   })

   const actions: Action[] = data ? data.proposals : undefined

   return {
      actions,
      loading,
   }
}

export default useGetActions
