import React from 'react'
import { Proposal } from '@/utils/types'
import AddressDisplay from './AddressDisplay'

const PropInfoPanel: React.FC<{
   prop: Proposal
}> = ({ prop }) => {
   const { admin, pendingAdmin, transferPending, proposer, isCompleted } = prop
   return (
      <div className='my-2 px-4 py-4 border rounded w-fit bg-white'>
         {isCompleted && (
            <div className='block w-fit bg-green-200 text-green-600 py-1 px-2 rounded text-xs font-medium mb-2'>PROP COMPLETED</div>
         )}
         <div className='flex flex-row text-md text-gray-800 space-x-8'>
            <div className='flex flex-col'>
               <div className='font-medium'>Proposer</div>
               <AddressDisplay blue={true} address={proposer} />
            </div>

            <div className='flex flex-col'>
               <div className='font-medium'>Admin</div>
               <AddressDisplay blue={true} address={admin} />
            </div>

            {transferPending && (
               <div className='flex flex-col'>
                  <div className='font-medium'>Pending Admin</div>
                  <AddressDisplay blue={true} address={pendingAdmin} />
               </div>
            )}
         </div>
      </div>
   )
}

export default PropInfoPanel
