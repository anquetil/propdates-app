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
   const sortedActions = [...actions].sort((a, b) =>
      Number(a.id) < Number(b.id) ? -1 : 1
   )
   const tags: {
      isCompleted: boolean
      isUnclaimed: boolean
      isProposer: boolean
      isAdmin: boolean
      isPendingAdmin: boolean
   }[] = []

   for (const a of sortedActions) {
      const thisTags = {
         isCompleted: false,
         isUnclaimed: false,
         isProposer: false,
         isAdmin: false,
         isPendingAdmin: false,
      }
      if (
         a.admin == zeroAddress &&
         a.pendingAdmin == zeroAddress &&
         a.proposer.toLowerCase() == address.toLowerCase()
      ) {
         thisTags.isUnclaimed = true
      }
      if (a.proposer.toLowerCase() == address.toLowerCase()) {
         thisTags.isProposer = true
      }
      if (a.admin.toLowerCase() == address.toLowerCase()) {
         thisTags.isAdmin = true
      }
      if (a.pendingAdmin.toLowerCase() == address.toLowerCase()) {
         thisTags.isPendingAdmin = true
      }
      if (a.isCompleted) {
         thisTags.isCompleted = true
      }
      tags.push(thisTags)
   }

   return (
      <div className='w-full space-y-8'>
         {sortedActions.length == 0 ? (
            <div className='text-gray-600 mb-3'>
               You are not the admin or proposer of any proposals.
            </div>
         ) : (
            <div className='w-full sm:w-2/3'>
               {sortedActions.map((a, i) => (
                  <div
                     key={i}
                     className={`flex flex-col sm:flex-row gap-y-4 justify-between items-start sm:items-center border-b w-full py-3`}
                  >
                     <div className='flex flex-col sm:flex-row gap-x-4'>
                        <div
                           className='max-w-[300px] w-fit truncate'
                           key={a.id}
                        >
                           {`#${a.id}: ${a.title}`}
                        </div>
                        <div className='flex flex-row gap-x-2'>
                           {tags[i].isCompleted && (
                              <div
                                 className={`rounded text-xs py-1 px-2 bg-green-200 text-green-600`}
                              >
                                 COMPLETED
                              </div>
                           )}
                           {tags[i].isUnclaimed && (
                              <div
                                 className={`rounded text-xs py-1 px-2 bg-orange-200 text-orange-600`}
                              >
                                 UNCLAIMED
                              </div>
                           )}
                           {tags[i].isProposer && (
                              <div
                                 className={`rounded text-xs py-1 px-2 bg-purple-200 text-purple-600`}
                              >
                                 PROPOSER
                              </div>
                           )}
                           {tags[i].isAdmin && (
                              <div
                                 className={`rounded text-xs py-1 px-2 bg-blue-200 text-blue-600`}
                              >
                                 ADMIN
                              </div>
                           )}
                           {tags[i].isPendingAdmin && (
                              <div
                                 className={`rounded text-xs py-1 px-2 bg-blue-200 text-blue-600`}
                              >
                                 PENDING ADMIN
                              </div>
                           )}
                        </div>
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
         )}
      </div>
   )
}
