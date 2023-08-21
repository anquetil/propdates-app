'use client'

import { AllUpdates } from "@/components/AllUpdates"
import { LoadingNoggles } from "@/components/LoadingNoggles"
import useGetPropAdmin from "@/hooks/useGetPropAdmin"
import useGetUpdates from "@/hooks/useGetUpdates"
import { update } from "@/utils/update"
import { gql, useQuery } from "@apollo/client"


export default function Home() {
   const { updates } = useGetUpdates()

   const { data: propData } = useGetPropAdmin(304, true)
   console.log(propData)

   return (
      <main className="flex min-h-screen flex-col w-3/4">
         <div className="text-4xl font-semibold text-red-500 my-8">PROPDATES</div>

         {updates ?
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
