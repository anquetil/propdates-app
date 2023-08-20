'use client'

import { LoadingNoggles } from "@/components/LoadingNoggles"
import { gql, useQuery } from "@apollo/client"


export default function Home() {
   const getAllUpdates = gql`query allUpdates {
      postUpdates {
         id
         propId
         isCompleted
         update
         transactionHash
         blockTimestamp
      }
   }`

   const { data } = useQuery(getAllUpdates)

   let updates: {
      blockTimestamp: string
      id: string
      isCompleted: boolean
      propId: string
      transactionHash: string
      update: string
   }[] = []
   if(data){
      updates = data.postUpdates
   }

   return (
      <main className="flex min-h-screen flex-col items-center">
         <div className="">
            {data ?
            ( 
               <div>{updates[0].update}</div>
            )
            :
            (
               <LoadingNoggles/>
            )
            }
         </div>
      </main>
   )
}
