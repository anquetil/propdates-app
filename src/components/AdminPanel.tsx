'use client'

import { Action, zeroAddress } from '@/utils/types'
import { Address } from 'viem'
import { AdminPanelAction } from './AdminPanelAction'
import { useState } from 'react'

export function AdminPanel({
   actions,
   address,
}: {
   actions: Action[]
   address: Address
}) {
   const [showRelevant, setShowRelevant] = useState(true)


   const sortedActions = [...actions].sort((a, b) => Number(a.id) - Number(b.id))

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
      const isDefactoAdmin =
         a.admin.toLowerCase() == address.toLowerCase() || isUnclaimed
      tags.push({
         isCompleted: a.isCompleted,
         isProposer,
         isDefactoAdmin,
         propPassed: a.executed,
      })
   }

   console.log("showRelevant: ", showRelevant)

   return (
      <div className='w-full space-y-8'>
         {sortedActions.length == 0 ? (
            <div className='text-gray-600 mb-3'>
               You are not the admin or proposer of any proposals.
            </div>
         ) : (
            <div className='flex flex-col w-full lg:w-4/5 xl:w-1/2'>
               <div className="flex items-center space-x-2 place-self-end w-fit mb-3">
                  <button 
                     onClick={() => setShowRelevant(!showRelevant)} 
                  type="button" 
                  role="switch" 
                  aria-checked={showRelevant ? "true" : "false"} 
                  className={`${showRelevant ? "bg-gray-800" : "bg-gray-200"} inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent 
                  transition-colors`}>
                     <span 
                     className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform 
                     ${showRelevant ? "translate-x-5" : "translate-x-0"}`}></span>
                  </button>
                  <div className="text-sm">
                     Only Show Relevant Proposals
                  </div>
               </div>
               <div className='divide-y border'>
                  {sortedActions.map((a, i) => {
                     if(!showRelevant || (showRelevant && a.executed && !a.isCompleted)){
                        return (
                           <AdminPanelAction key={i} action={a} tag={tags[i]} />
                        )
                     }
                  })}
               </div>
            </div>
         )}
      </div>
   )
}
