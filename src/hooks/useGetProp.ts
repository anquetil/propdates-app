import { Proposal } from "@/utils/types";
import { gql, useQuery } from "@apollo/client";

export function useGetProp(propId: number, enabled: boolean) {
   const query = gql`query propQuery {
      proposal(
            id: ${propId.toString()}
      ){
        id
        admin
        transferPending
        pendingAdmin
    		isCompleted
        updates(orderBy: blockTimestamp orderDirection:desc) {
        	id
            admin
            prop {
               id
            }
          isCompleted
          update
          transactionHash
          blockTimestamp
        }
      }
   }`

   const { data } = useQuery(query, {
      skip: !enabled
   })

   const prop: Proposal = data ? data.proposal : undefined

   return {
      prop
   }
}

export default useGetProp