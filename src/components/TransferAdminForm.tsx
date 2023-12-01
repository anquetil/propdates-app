'use client'

import { Proposal, zeroAddress } from '@/utils/types'
import { Address } from 'wagmi'
import useTransferAdmin from '@/hooks/useTransferAdmin'
import { useState } from 'react'
import { isAddress } from 'viem'
import { LoadingNoggles } from './LoadingNoggles'
import Link from 'next/link'

export function TransferAdminForm({
   connectedAddress,
   prop,
}: {
   connectedAddress: Address
   prop: Proposal
}) {
   //
   const [error, setError] = useState<boolean>(false)
   const [newAdmin, setNewAdmin] = useState<Address>(connectedAddress)
   const { id, admin, proposer } = prop
   const unclaimed = admin == zeroAddress
   const isAdmin = connectedAddress.toLowerCase() == admin.toLowerCase()
   const isProposer = connectedAddress.toLowerCase() == proposer.toLowerCase()
   const canTransfer = (!unclaimed && isAdmin) || (unclaimed && isProposer)

   const enableWrite = isAdmin || (unclaimed && isProposer)
   const { write, isSuccess, transactionData, isLoading } = useTransferAdmin(
      Number(id),
      newAdmin,
      enableWrite
   )

   if (isLoading) {
      return (
         <div className='mt-4 w-36 flex items-start flex-col'>
            <LoadingNoggles />
            <div className='text-neutral-400'>Transfering role... </div>
         </div>
      )
   } else if (isSuccess) {
      return (
         <div className='w-2/3 mt-4 flex flex-col items-center bg-green-100 border-green-300 border py-5 px-12 gap-y-2 rounded'>
            <div className='text-green-800 text-lg'>{`Role transfered!`}</div>
            <Link
               target='_blank'
               href={`https://etherscan.io/tx/${transactionData?.transactionHash}`}
               className='text-green-800 underline hover:cursor-pointer text-sm font-medium'
            >
               Txn Receipt
            </Link>
         </div>
      )
   }

   if (canTransfer) {
      // is proposer pre-claim or admin
      return (
         <div className='text-gray-700'>
            <div>
               You are the admin of this proposal. You can transfer the role to
               someone else. Once they accept it, you will no longer be able to
               change the admin. They will be able to transfer it to whoever
               they want.
            </div>

            <div className='flex flex-col items-start mt-4'>
               <div className='font-medium'>New Admin:</div>
               <input
                  className='mt-1 mb-4 rounded p-1 border border-neutral-200 min-w-[200px] sm:min-w-[410px]'
                  type='text'
                  name='newAdmin'
                  id='newAdmin'
                  pattern='^0x[a-fA-F0-9]{40}$'
                  title='Must be valid Ethereum address.'
                  onChange={(e) => {
                     if (isAddress(e.target.value)) {
                        setError(false)
                        setNewAdmin(e.target.value as Address)
                     } else {
                        setError(true)
                     }
                  }}
                  defaultValue={connectedAddress}
               />
               {error && (
                  <div className='text-red-600 -mt-3 mb-3'>
                     Must be valid Ethereum address.
                  </div>
               )}
               <button
                  className='bg-blue-500  border hover:opacity-95 transition-all ease-in-out shadow-sm rounded-md py-[3px] px-[14px] text-white'
                  type='submit'
                  onClick={() => {
                     write?.()
                  }}
               >
                  Submit
               </button>
            </div>
         </div>
      )
   } else {
      return (
         <div className='text-gray-700'>
            Only the admin can transfer this role or write updates. If not yet
            claimed, the proposer will need to claim or transfer the admin role
            to another address.
         </div>
      )
   }
}
