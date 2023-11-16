'use client'

import { Action, zeroAddress } from '@/utils/types'
import { Address } from 'viem'
import Link from 'next/link'
import { AdminPanelAction } from './AdminPanelAction'

export function AdminPanel({
   actions,
   address,
}: {
   actions: Action[]
   address: Address
}) {
   const passedProps = [...actions].filter((a) => a.executed)
   const failedProps = [...actions].filter((a) => !a.executed)

   const sortedFailedProps = [...failedProps].sort(
      (a, b) => Number(a.id) - Number(b.id)
   )
   const sortedCompletedActions = [...passedProps]
      .filter((a) => a.isCompleted)
      .sort((a, b) => Number(a.id) - Number(b.id))
   const sortedActions = [...passedProps]
      .filter((a) => !a.isCompleted)
      .sort((a, b) => Number(a.id) - Number(b.id))

   type Tag = {
      isCompleted: boolean
      isProposer: boolean
      isDefactoAdmin: boolean
      propPassed: boolean
   }

   const passedTags: Tag[] = []
   const failedTags: Tag[] = []
   for (const a of sortedActions) {
      const isUnclaimed =
         a.admin == zeroAddress &&
         a.proposer.toLowerCase() == address.toLowerCase()
      const isProposer = a.proposer.toLowerCase() == address.toLowerCase()
      const isDefactoAdmin = a.admin.toLowerCase() == address.toLowerCase() || isUnclaimed
      passedTags.push({
         isCompleted: a.isCompleted,
         isProposer,
         isDefactoAdmin,
         propPassed: a.executed,
      })
   }
   for (const a of sortedFailedProps) {
      const isUnclaimed =
         a.admin == zeroAddress &&
         a.proposer.toLowerCase() == address.toLowerCase()
      const isProposer = a.proposer.toLowerCase() == address.toLowerCase()
      const isDefactoAdmin = a.admin.toLowerCase() == address.toLowerCase() || isUnclaimed
      failedTags.push({
         isCompleted: a.isCompleted,
         isProposer,
         isDefactoAdmin,
         propPassed: a.executed,
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
                        <AdminPanelAction
                           key={i}
                           action={a}
                           tag={passedTags[i]} />
                     ))}
               </div>

               <div className='ml-2 mb-2 mt-6 text-lg text-gray-500'>
                  Completed Proposals
               </div>
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

               <div className='ml-2 mb-2 mt-6 text-lg text-gray-500'>
                  Failed / Pending Proposals
               </div>
               {
                  <div className='divide-y border'>
                     {sortedFailedProps.map((a, i) => (
                        <AdminPanelAction
                           key={i}
                           action={a}
                           tag={failedTags[i]}/>
                     ))}
                  </div>
               }
            </div>
         )}
      </div>
   )
}
