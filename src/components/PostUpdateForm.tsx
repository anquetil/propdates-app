'use client'

import { Proposal } from '@/utils/types'
import { useState } from 'react'
import usePostUpdate from '@/hooks/usePostUpdate'
import { LoadingNoggles } from './LoadingNoggles'
import Link from 'next/link'

export function PostUpdateForm({ prop }: { prop: Proposal }) {
   const [updateText, setUpdateText] = useState<string>('')
   const [completed, setCompleted] = useState<boolean>(false)
   const { id, count } = prop

   const { write, isSuccess, isLoading, error } = usePostUpdate(
      Number(id),
      updateText,
      completed
   )

   if (error) {
      return (
         <div className='mt-4 text-red-600'>
            {error.name} - {error.message}
         </div>
      )
   } else if (isLoading) {
      return (
         <div className='mt-4 w-32 flex items-start flex-col'>
            <LoadingNoggles />
            <div className='text-neutral-400'>Processing txn... </div>
         </div>
      )
   } else if (isSuccess) {
      return (
         <div className='mt-4 flex flex-col items-center w-fit bg-green-100 border-green-300 border py-5 px-12 gap-y-2 rounded'>
            <div className='text-green-800 text-lg'>{`Success!`}</div>
            <Link
               className='flex flex-row w-fit gap-x-2 px-3 py-1 bg-white shadow hover:shadow-md ease-in-out transition-all duration-200 rounded-md border w- fit'
               href={`/update/${id}-${count}`}
            >
               <div>{`View update`}</div>
            </Link>
         </div>
      )
   }

   return (
      <div>
         <div className='flex flex-col items-start space-y-2 mt-4'>
            <div className='font-medium'>Update</div>
            <div className='flex flex-row space-x-2 mb-4'>
               <input
                  type='checkbox'
                  className='w-fit rounded border border-neutral-200'
                  onChange={(e) => {
                     setCompleted(e.currentTarget.checked)
                  }}
               />
               <div className='text-gray-500'>{`Mark proposal work as completed (this can't be undone)`}</div>
            </div>
            <textarea
               className='mt-1 mb-4 rounded border border-neutral-200 w-full align-text-top overflow-auto p-2 pb-20'
               name='updateText'
               id='updateText'
               onChange={(e) => {
                  setUpdateText(e.target.value)
               }}
               placeholder='Write your update here! Feel free to use Markdown.'
            />

            <button
               className='bg-blue-500  border hover:opacity-95 transition-all ease-in-out shadow-sm rounded-md py-[3px] px-[14px] text-white'
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
