'use client'

import { Action, zeroAddress } from '@/utils/types'
import { Address } from 'viem'
import Link from 'next/link'

export function AdminPanel({
   actions,
   address,
}: {
   actions: Action[]
   address: Address
}) {
   const sortedCompletedActions = [...actions]
      .filter((a) => a.isCompleted)
      .sort((a, b) => (Number(a.id) < Number(b.id) ? -1 : 1))
   const sortedActions = [...actions]
      .filter((a) => !a.isCompleted)
      .sort((a, b) => (Number(a.id) < Number(b.id) ? -1 : 1))
   const tags: {
      isCompleted: boolean
      isUnclaimed: boolean
      isProposer: boolean
      isAdmin: boolean
      isPendingAdmin: boolean
      canTransfer: boolean
   }[] = []

   for (const a of sortedActions) {
      const isUnclaimed =
         a.admin == zeroAddress &&
         a.proposer.toLowerCase() == address.toLowerCase()
      const isProposer = a.proposer.toLowerCase() == address.toLowerCase()
      const isAdmin = a.admin.toLowerCase() == address.toLowerCase()
      const isPendingAdmin =
         a.pendingAdmin.toLowerCase() == address.toLowerCase()
      const isCompleted = a.isCompleted
      const canTransfer =
         (!isUnclaimed && isAdmin) || (isUnclaimed && isProposer)
      tags.push({
         isCompleted,
         isUnclaimed,
         isProposer,
         isAdmin,
         isPendingAdmin,
         canTransfer,
      })
   }

   return (
      <div className='w-full space-y-8'>
         {sortedActions.length == 0 ? (
            <div className='text-gray-600 mb-3'>
               You are not the admin or proposer of any proposals.
            </div>
         ) : (
            <div className='w-full lg:w-4/5 xl:w-1/2'>
               <div className='divide-y border'>
                  {sortedActions.map((a, i) => (
                     <div
                        key={i}
                        className={`flex flex-col gap-y-2 justify-between items-start w-full bg-white px-6 p-4`}
                     >
                        <div className='flex flex-row sm:flex-row gap-x-2'>
                           <Link
                              className='max-w-[300px] w-fit truncate hover:cursor-pointer font-medium'
                              key={a.id}
                              href={`/prop/${a.id}`}
                           >
                              {`#${a.id}: ${a.title}`}
                           </Link>
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

                        {tags[i].canTransfer && (
                           <Link
                              href={`/manage/${a.id}`}
                              className='bg-gray-800 text-white text-center text-sm  transition-all ease-in-out shadow-sm hover:shadow rounded-lg py-2 sm:py-1 px-[14px] border-gray-600 border'
                           >
                              {`${tags[i].isAdmin ? 'Change' : 'Claim'} Admin`}
                           </Link>
                        )}

                        {(tags[i].isAdmin || tags[i].isPendingAdmin) && (
                           <Link
                              href={`/post/${a.id}`}
                              className='bg-white text-center text-sm  transition-all ease-in-out shadow-sm hover:shadow rounded-lg py-2 sm:py-1 px-[14px] text-black border'
                           >
                              Post
                           </Link>
                        )}
                     </div>
                  ))}
               </div>

               <div className='ml-2 mb-2 mt-6 text-lg'>Completed Proposals</div>
               <div className='divide-y border'>
                  {sortedCompletedActions.map((a, i) => (
                     <div
                        key={i}
                        className={`flex flex-col gap-y-2 justify-between items-start w-full bg-white px-6 p-4`}
                     >
                        <div className='flex flex-col gap-y-2'>
                           <Link
                              className='max-w-[300px] w-fit truncate hover:cursor-pointer font-medium'
                              key={a.id}
                              href={`/prop/${a.id}`}
                           >
                              {`#${a.id}: ${a.title}`}
                           </Link>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         )}
      </div>
   )
}
