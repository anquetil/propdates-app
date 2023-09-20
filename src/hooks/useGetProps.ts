import { MinimalProp } from '@/utils/types'
import { gql, useQuery } from '@apollo/client'

export function useGetProps(enabled = true) {
   const query = gql`
      query useGetProps {
         proposals(first: 500, where: { executed: true }) {
            id
            title
            proposer
            admin
            executed
            isCompleted
            updates {
               id
            }
         }
      }
   `

   const { data } = useQuery(query, {
      skip: !enabled,
   })

   const proposals: MinimalProp[] = data ? data.proposals : undefined
   return {
      proposals,
   }
}

export default useGetProps
