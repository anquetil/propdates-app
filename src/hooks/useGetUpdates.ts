import { update } from "@/utils/update";
import { gql, useQuery } from "@apollo/client";

export function useGetUpdates(prop?: number, enabled = true) {
   console.log('in useGetUpdates. prop: ', prop, 'enabled: ', enabled)
   const query = gql`query allUpdates {
      postUpdates (
         ${
            prop ? 
            `where: {
            propId: "${prop.toString()}"
            }` 
            : 
            ''
         }
         orderBy: blockNumber, 
         orderDirection: desc
      ){
         id
         from
         propId
         isCompleted
         update
         transactionHash
         blockTimestamp
      }
   }`

   const { data } = useQuery(query, {
      skip: !enabled
   })

   const updates:update[] = data ? data.postUpdates : undefined

   return {
      updates
   }

}

export default useGetUpdates