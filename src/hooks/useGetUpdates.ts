import { PropUpdate } from '@/utils/types'
import { gql, useQuery } from '@apollo/client'

export function useGetUpdates(prop?: number, enabled = true) {
   const query = gql`query allUpdates {
      propUpdates (
         ${
            prop
               ? `where: {
            prop: "${prop.toString()}"
            }`
               : ''
         }
         orderBy: blockNumber, 
         orderDirection: desc
         first: 800
      ){
         id
         admin
         prop {
            id
            proposer
            title
        	}
         isCompleted
         update
         transactionHash
         blockTimestamp
      }
   }`

   const { data } = useQuery(query, {
      skip: !enabled,
   })

   const updates: PropUpdate[] = data ? data.propUpdates : undefined

   return {
      updates,
   }
}

export default useGetUpdates
