'use client'

import { Action, zeroAddress } from '@/utils/types'
import { Address } from 'viem'
import Link from 'next/link'

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
         a.pendingAdmin == zeroAddress &&
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
      <div className='w-full space-y-8 -mt-4'>
         {needToClaim.length == 0 && myProps.length == 0 && (
            <div className='text-gray-600 mb-3'>
               You are not the admin of any proposals.
            </div>
         )}
         <div>
            {needToClaim.length > 0 && (
               <div className='text-gray-600 mb-3'>
                  These proposals might need action - you should claim the admin
                  role for yourself or transfer it to someone else.
               </div>
            )}
            <div>
               {needToClaim.map((a, i) => (
                  <div
                     key={i}
                     className={`flex flex-col space-y-1 sm:space-y-0 sm:flex-row items-start sm:items-center border-b w-fit py-3`}
                  >
                     <div
                        className='max-w-[300px] sm:min-w-[300px] truncate sm:mr-8'
                        key={a.id}
                     >
                        {`#${a.id}: ${a.title}`}
                     </div>
                     <Link
                        href={`/settings/${a.id}`}
                        className='bg-blue-500 hover:opacity-90 transition-all ease-in-out shadow-sm rounded-lg py-[2px] px-[14px] text-white'
                     >
                        Claim
                     </Link>
                  </div>
               ))}
            </div>
         </div>
         <div>
            <div>
               {myProps.map((a, i) => (
                  <div
                     key={i}
                     className={`flex flex-col space-y-1 sm:space-y-0 sm:flex-row items-start sm:items-center border-b w-fit py-3`}
                  >
                     <div
                        className='max-w-[300px] sm:min-w-[300px] truncate sm:mr-8'
                        key={a.id}
                     >
                        {`#${a.id}: ${a.title}`}
                     </div>
                     <Link
                        href={`/settings/${a.id}`}
                        className='bg-white text-center text-sm  transition-all ease-in-out shadow-sm hover:shadow rounded-lg py-2 sm:py-1 px-[14px] text-black border'
                     >
                        Manage or Post
                     </Link>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}
