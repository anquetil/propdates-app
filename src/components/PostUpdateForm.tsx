'use client'

import { IBM_Plex_Mono } from 'next/font/google'
import { Proposal, zeroAddress } from '@/utils/types'
import { Address, useAccount } from 'wagmi'
import useTransferAdmin from '@/hooks/useTransferAdmin'
import { useState } from 'react'
import { isAddress } from 'viem'
import usePostUpdate from '@/hooks/usePostUpdate'

export function PostUpdateForm({ prop }: { prop: Proposal }) {
   const [updateText, setUpdateText] = useState<string>('')
   const [completed, setCompleted] = useState<boolean>(false)
   const { id, admin, pendingAdmin, transferPending, proposer } = prop

   const { write, isSuccess, transactionData } = usePostUpdate(
      Number(id),
      updateText,
      completed
   )

   if (isSuccess) {
      return (
         <div className='font-bold'>
            {`Success! Update posted: `}
            <a
               className='underline text-blue-500 hover:text-blue-700'
               href={`https://etherscan.io/tx/${transactionData?.transactionHash}`}
            >
               {transactionData?.transactionHash}
            </a>
         </div>
      )
   }

   return (
      <div>
         <div className='flex flex-col items-start space-y-2 mt-4'>
            <div className='font-medium'>Update</div>
            <div className='flex flex-row space-x-2 mb-4'>
               <input
                  type="checkbox"
                  className='w-fit rounded border-[1px] border-neutral-200'
                  onChange={(e) => {
                     setCompleted(e.currentTarget.checked)
                  }}
               />
               <div className='text-gray-500'>Mark proposal work as completed</div>
            </div>
            <textarea
               className='mt-1 mb-4 rounded border-[1px] border-neutral-200 w-full align-text-top overflow-auto p-2 pb-20'
               name='updateText'
               id='updateText'
               onChange={(e) => {
                  setUpdateText(e.target.value)
               }}
               placeholder='Write your update here! Feel free to use Markdown.'
            />


            <button
               className='bg-blue-500  border-[1px] hover:opacity-95 transition-all ease-in-out shadow-sm rounded-md py-[3px] px-[14px] text-white'
               type='submit'
               onClick={() => {
                  write?.()
               }}
            >
               Post Update
            </button>
         </div>
      </div>
   )
}
