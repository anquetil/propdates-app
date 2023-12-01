import { MinimalProp } from '@/utils/types'
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
               {admin:"${address}"}
            ]
         }
      ){
         id
         title
         proposer
         admin
         executed
         isCompleted
         count
      }
   }`

   const { data, loading } = useQuery(query, {
      skip: !enabled,
   })

   const actions: MinimalProp[] = data ? data.proposals : undefined
   return {
      actions,
      loading,
   }
}

export default useGetActions
