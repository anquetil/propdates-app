'use client'

import { Proposal, zeroAddress } from '@/utils/types'
import { Address } from 'wagmi'
import useTransferAdmin from '@/hooks/useTransferAdmin'
import { useState } from 'react'
import { isAddress } from 'viem'

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
   const { write, isSuccess, transactionData } = useTransferAdmin(
      Number(id),
      newAdmin,
      enableWrite
   )

   if (isSuccess) {
      return (
         <div className='font-bold'>
            {`Success! Transaction: `}
            <a
               className='underline text-blue-500 hover:text-blue-700'
               href={`https://etherscan.io/tx/${transactionData?.transactionHash}`}
            >
               {transactionData?.transactionHash}
            </a>
         </div>
      )
   }

   if (canTransfer) {
      // is proposer pre-claim or admin
      return (
         <div className='text-gray-700'>
            <div>
               You are the admin of this proposal. You can transfer the role
               to someone else. Once they accept it, you will no longer be
               able to change the admin. They will be able to transfer it to
               whoever they want.
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
   }  else {
      return (
         <div className='text-gray-700'>
            Only the admin can transfer this role or write updates. If
            not yet claimed, the proposer will need to claim or transfer the
            admin role to another address.
         </div>
      )
   }
}
