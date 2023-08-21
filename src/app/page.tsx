'use client'

import { AllUpdates } from "@/components/AllUpdates"
import { LoadingNoggles } from "@/components/LoadingNoggles"
import useGetUpdates from "@/hooks/useGetUpdates"


export default function Home() {
   const { updates } = useGetUpdates()

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
