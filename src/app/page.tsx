'use client'

import { AllUpdates } from "@/components/AllUpdates"
import { LoadingNoggles } from "@/components/LoadingNoggles"
import useGetPropAdmin from "@/hooks/useGetPropAdmin"
import { update } from "@/utils/update"
import { gql, useQuery } from "@apollo/client"


export default function Home() {
   const getAllUpdates = gql`query allUpdates {
      postUpdates (
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

   const { data } = useQuery(getAllUpdates)

   let updates:update[] = []
   if(data){
      updates = data.postUpdates
   }

   const { data: propData } = useGetPropAdmin(304)
   console.log(propData)

   return (
      <main className="flex min-h-screen flex-col w-3/4">
         <div className="text-3xl font-semibold text-red-500 my-8">PROPDATES</div>

         {data ?
            ( 
               <AllUpdates updates={updates}/>
            )
            :
            (
               <LoadingNoggles/>
            )
         }
      </main>
   )
}
