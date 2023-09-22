import React from 'react'
import Link from 'next/link'
import { useAccount, type Address } from 'wagmi'
import useGetName from '../hooks/useGetName'
import { Proposal } from '@/utils/types'
import AddressDisplay from './AddressDisplay'

const PropInfoPanel: React.FC<{
   prop: Proposal
}> = ({ prop }) => {
   const { admin, pendingAdmin, transferPending, proposer, isCompleted } = prop
   return (
      <div className='my-2 px-4 py-4 border rounded'>
         {isCompleted && (
            <div className='mb-1'>
               ✅
               <span className='italic text-gray-600'>{` This proposal's work was marked as completed by the admin`}</span>
            </div>
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
