'use client'

import { Action, PropUpdate, zeroAddress } from "@/utils/types"
import { Address } from "viem"
import { IBM_Plex_Mono } from "next/font/google"
import Link from "next/link"
const mono = IBM_Plex_Mono({
   subsets: ['latin'],
   weight: ['100', '200', '300', '400', '500', '600', '700']
})

export function Actions({actions, address} : {actions: Action[], address: Address}){

   let needToAccept = [] as Action[]
   let needToClaim= [] as Action[]

   for(const a of actions){
      if (a.admin == zeroAddress && a.proposer.toLowerCase() == address.toLowerCase()){
         needToClaim.push(a)
      } else if (a.transferPending == true && a.pendingAdmin.toLowerCase() == address.toLowerCase()){
         needToAccept.push(a)
      } else {
         console.log("action doesn't fit in needToClaim or needToAccept")
      }
   }

   needToClaim = needToClaim.sort((a, b) => (Number(a.id) < Number(b.id) ? -1 : 1))
   needToAccept = needToAccept.sort((a,b) => (Number(a.id) < Number(b.id) ? -1 : 1))

   // ALSO NEED TO PUT ACTIVE ONES TO TRANSFER EVEN IF CLAIMED


   return (
      <div className="w-full space-y-8">
         <div>
            <div className='max-w-[450px] text-neutral-600 mb-3'>These proposals need action - you should claim the admin role for yourself or transfer it to someone else.</div>
            <div>
               {needToClaim.map((a) => (
                  <div className={`flex flex-row items-center border-dashed border-b-2 border-neutral-200 w-fit p-3`}>
                     <div className={`${mono.className} w-12 flex flex-row font-semibold`}>{`#${a.id}`}</div>
                     <div className="max-w-[300px] min-w-[300px] truncate ml-4 mr-8" key={a.id}>
                        {a.title}
                     </div>
                     <Link href={`/admin/${a.id}`} className="bg-blue-500 border-blue-600 border-[1px] hover:opacity-90 transition-all ease-in-out shadow-sm rounded-lg py-[2px] px-[14px] text-white">
                        Claim
                     </Link>
                  </div>

               ))}
            </div>
         </div>
         <div>
            <div>Need to Accept</div>
            <div>
               {needToAccept.map((a) => (
                  <div key={a.id}>
                     {a.id}
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}