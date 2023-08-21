'use client'

import { IBM_Plex_Mono } from "next/font/google";
import {  useEnsName } from "wagmi";
import Link from "next/link";
import useGetProp from "@/hooks/useGetProp";
import { LoadingNoggles } from "@/components/LoadingNoggles";
import { AllUpdates } from "@/components/AllUpdates";
const mono = IBM_Plex_Mono({
   subsets: ['latin'],
   weight: ['100', '200', '300', '400', '500', '600', '700']
})

const zeroAddress = '0x0000000000000000000000000000000000000000'

export default function PropPage({ params } : {params: {prop: string}}) {
   const propId = Number(params.prop)
   const { prop } = useGetProp(Number(propId), propId != -1000)
   console.log(prop ?? '')

   const {data : adminENS} = useEnsName({
      address: (prop ? prop.admin : zeroAddress),
      enabled: prop != undefined && prop.admin != zeroAddress
   })   
   if (prop == undefined) return <main className="flex min-h-screen flex-col w-3/4"><LoadingNoggles/></main>
   const unclaimed = prop.admin == zeroAddress
   const { updates } = prop

   return (
      <main className="flex min-h-screen flex-col w-3/4">
         <div className={`${mono.className} text-4xl mt-8 font-semibold`}>
            Proposal {propId}
            </div>
            {
               unclaimed ?
               (
                  <div className="flex flex-row space-x-2 w-fit p-3 bg-yellow-100 text-yellow-600 border-[1px] border-yellow-300 rounded">
                     <div>⚠️</div>
                     <div>Unclaimed admin role - is this you? <Link className="text-yellow-600 hover:text-yellow-800 underline" href="/admin">Claim here</Link></div>
                  </div>
               )
               :
               (
                  <div className="flex flex-col space-y-1 text-md">
                     <div>Admin: {adminENS ?? prop.admin}</div>
                     <div>{prop.isCompleted ? '✅ Completed' : '⏳ Incomplete'}</div>
                  </div>
               )
            }
            {
               updates ?
               (
                  <AllUpdates updates={updates}/>
               )
               :
               (
                  <LoadingNoggles/>
               )
            }
            <div>       
         </div>
      </main>
   )
}