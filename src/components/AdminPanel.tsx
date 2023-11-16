'use client'

import { Action, zeroAddress } from '@/utils/types'
import { Address } from 'viem'
import { AdminPanelAction } from './AdminPanelAction'

export function AdminPanel({
   actions,
   address,
}: {
   actions: Action[]
   address: Address
}) {

   const sortedActions = [...actions]
      .sort((a, b) => Number(b.executed) - Number(a.executed))
      .sort((a, b) => Number(b.isCompleted) - Number(a.isCompleted))
      .sort((a, b) => Number(a.id) - Number(b.id))

   type Tag = {
      isCompleted: boolean
      isProposer: boolean
      isDefactoAdmin: boolean
      propPassed: boolean
   }

   const tags: Tag[] = []
   for (const a of sortedActions) {
      const isUnclaimed =
         a.admin == zeroAddress &&
         a.proposer.toLowerCase() == address.toLowerCase()
      const isProposer = a.proposer.toLowerCase() == address.toLowerCase()
      const isDefactoAdmin = a.admin.toLowerCase() == address.toLowerCase() || isUnclaimed
      tags.push({
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
                     {sortedActions.map((a, i) => {
                        return (
                           <AdminPanelAction
                              key={i}
                              action={a}
                              tag={tags[i]} 
                           />)
                     })}
               </div>
            </div>
         )}
      </div>
   )
}
