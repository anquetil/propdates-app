'use client'

import { IBM_Plex_Mono } from "next/font/google";
import { update } from "@/utils/update";
import { Address, useEnsName } from "wagmi";
import Link from "next/link";
import useGetPropAdmin from "@/hooks/useGetPropAdmin";
import { useSearchParams } from "next/navigation";
import { LoadingNoggles } from "@/components/LoadingNoggles";
import { formatTimestampString } from "@/utils/funcs";
import useGetUpdates from "@/hooks/useGetUpdates";
import { AllUpdates } from "@/components/AllUpdates";
const mono = IBM_Plex_Mono({
   subsets: ['latin'],
   weight: ['100', '200', '300', '400', '500', '600', '700']
})

export default function PropPage({ params } : {params: {prop: string}}) {
   console.log('here in proppage')
   const prop = Number(params.prop)
   const { data } = useGetPropAdmin(Number(prop), prop != -1000)
   console.log(data ?? '')

   const {data : adminENS} = useEnsName({
      address: data?.propUpdateAdmin,
      enabled: data != undefined && data.propUpdateAdmin != '0x0000000000000000000000000000000000000000'
   })

   const { updates } = useGetUpdates(prop)
   
   if (data == undefined) return <main className="flex min-h-screen flex-col w-3/4"><LoadingNoggles/></main>
   const unclaimed = data.propUpdateAdmin == '0x0000000000000000000000000000000000000000'

   return (
      <main className="flex min-h-screen flex-col w-3/4">
         <div className={`${mono.className} text-xl`}>
            Proposal {prop}
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
                  <div className="flex flex-col space-y-1">
                     <div>Admin: {adminENS ?? data.propUpdateAdmin}</div>
                     <div>{data.isCompleted ? '✅ Completed' : '⏳ Incomplete'}</div>
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