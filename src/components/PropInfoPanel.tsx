import React from 'react'
import { Proposal } from '@/utils/types'
import AddressDisplay from './AddressDisplay'

const PropInfoPanel: React.FC<{
   prop: Proposal
}> = ({ prop }) => {
   const { admin, pendingAdmin, transferPending, proposer, isCompleted } = prop
   return (
      <div className='sm:sticky flex flex-col sm:top-10 py-3 pl-4 pr-16 border rounded shrink h-fit w-full sm:w-fit bg-white shadow-sm'>
         {isCompleted && (
            <div className='block w-fit bg-green-200 text-green-600 py-1 px-2 rounded text-xs font-medium mb-2'>
               PROP COMPLETED
            </div>
         )}
         <div className='flex flex-col text-md text-gray-600 space-y-4'>
            <div className='flex flex-col'>
               <div className='font-base'>Proposer</div>
               <AddressDisplay blue={true} address={proposer} />
            </div>

            <div className='flex flex-col'>
               <div className='font-base'>Admin</div>
               <AddressDisplay blue={true} address={admin} />
            </div>

            {transferPending && (
               <div className='flex flex-col'>
                  <div className='font-base'>Pending Admin</div>
                  <AddressDisplay blue={true} address={pendingAdmin} />
               </div>
            )}
         </div>
      </div>
   )
}

export default PropInfoPanel
