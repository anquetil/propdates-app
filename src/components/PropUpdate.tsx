'use client'

import { IBM_Plex_Mono } from "next/font/google";
import { update } from "@/utils/update";
import { Address, useEnsName } from "wagmi";
import Link from "next/link";
import { formatTimestampString } from "@/utils/funcs";
const mono = IBM_Plex_Mono({
   subsets: ['latin'],
   weight: ['100', '200', '300', '400', '500', '600', '700']
})

export function PropUpdate({data} : {data: update}){
   const { data: ensData } = useEnsName({
      address: data.from as Address
   })

   return(
      <div className='w-full rounded-xl border-neutral-200 border-[1px] p-4'>
         <div className='mb-2'>
            <span className="font-semibold">{ensData ?? data.from.substring(0, 7)}</span> 
            {` gave an update on prop `}
            <Link href={`/prop/${data.propId}`} className="text-blue-700 hover:text-blue-500">{data.propId}</Link>
         </div>
         <div className={`w-fit mb-2 rounded-md text-md bg-gray-200 border-gray-300 text-gray-500 p-4 ${mono.className}`}>
            {data.update}
         </div>
         <div className={`text-gray-400 text-sm`}>
            {formatTimestampString(data.blockTimestamp)}
            {` | `}
            <a className="hover:underline" href={`https://etherscan.io/tx/${data.transactionHash}`} target="_blank">{data.transactionHash.substring(0, 5)}...{data.transactionHash.substring(63, 66)}</a>
         </div>
      </div>
   )
}