'use client'

import { Action, PropUpdate, zeroAddress } from '@/utils/types'
import { Address } from 'viem'
import { IBM_Plex_Mono } from 'next/font/google'
import Link from 'next/link'
const mono = IBM_Plex_Mono({
   subsets: ['latin'],
   weight: ['100', '200', '300', '400', '500', '600', '700'],
})

export function Actions({
   actions,
   address,
}: {
   actions: Action[]
   address: Address
}) {
   let myProps = [] as Action[]
   let needToClaim = [] as Action[]

   for (const a of actions) {
      if (
         a.admin == zeroAddress &&
         a.proposer.toLowerCase() == address.toLowerCase()
      ) {
         needToClaim.push(a)
      } else if (
         a.admin.toLowerCase() == address.toLowerCase() ||
         a.pendingAdmin.toLowerCase() == address.toLowerCase()
      ) {
         // IF PENDING, ACT AS REAL ADMIN ON FRONT-END
         myProps.push(a)
      } else {
         console.log("action doesn't fit in needToClaim or myProps")
      }
   }

   needToClaim = needToClaim.sort((a, b) =>
      Number(a.id) < Number(b.id) ? -1 : 1
   )
   myProps = myProps.sort((a, b) => (Number(a.id) < Number(b.id) ? -1 : 1))

   return (
      <div className='w-full space-y-8'>
         {needToClaim.length == 0 && myProps.length == 0 && (
            <div className='text-neutral-600 mb-3'>
               You are not the admin of any proposals.
            </div>
         )}
         <div>
            {needToClaim.length > 0 && (
               <div className='text-neutral-600 mb-3'>
                  These proposals need action - you should claim the admin role
                  for yourself or transfer it to someone else.
               </div>
            )}
            <div>
               {needToClaim.map((a, i) => (
                  <div
                     key={i}
                     className={`flex flex-row items-center border-dashed border-b-2 border-neutral-200 w-fit p-3`}
                  >
                     <div
                        className={`${mono.className} w-12 flex flex-row font-semibold`}
                     >{`#${a.id}`}</div>
                     <div
                        className='max-w-[300px] min-w-[300px] truncate ml-4 mr-8'
                        key={a.id}
                     >
                        {a.title}
                     </div>
                     <Link
                        href={`/admin/${a.id}`}
                        className='bg-blue-500 hover:opacity-90 transition-all ease-in-out shadow-sm rounded-lg py-[2px] px-[14px] text-white'
                     >
                        Claim
                     </Link>
                  </div>
               ))}
            </div>
         </div>
         <div>
            <div>{myProps.length > 0 && 'Your Props'}</div>
            <div>
               {myProps.map((a, i) => (
                  <div
                     key={i}
                     className={`flex flex-row items-center border-dashed border-b-2 border-neutral-200 w-fit p-3`}
                  >
                     <div
                        className={`${mono.className} w-12 flex flex-row font-semibold`}
                     >{`#${a.id}`}</div>
                     <div
                        className='max-w-[300px] min-w-[300px] truncate ml-4 mr-8'
                        key={a.id}
                     >
                        {a.title}
                     </div>
                     <Link
                        href={`/admin/${a.id}`}
                        className='bg-blue-500 hover:opacity-90 transition-all ease-in-out shadow-sm rounded-lg py-[2px] px-[14px] text-white'
                     >
                        Manage / Post
                     </Link>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}
