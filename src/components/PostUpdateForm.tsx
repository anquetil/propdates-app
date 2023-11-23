'use client'

import { Proposal } from '@/utils/types'
import { useState } from 'react'
import usePostUpdate from '@/hooks/usePostUpdate'
import { LoadingNoggles } from './LoadingNoggles'
import Link from 'next/link'
import { CaretDownIcon } from '@radix-ui/react-icons'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'

export function PostUpdateForm({ prop }: { prop: Proposal }) {
   const [updateText, setUpdateText] = useState<string>('')
   const [completed, setCompleted] = useState<boolean>(false)
   const [showPreview, setShowPreview] = useState<boolean>(false)

   const { id, count } = prop

   const { write, isSuccess, isLoading, error, transactionData } =
      usePostUpdate(Number(id), updateText, completed)

   const updateURL = `https://updates.wtf/update/${id}-${Number(count) + 1}`
   const warpcast_URL = `https://warpcast.com/~/compose?text=${encodeURI(
      `I just posted a Propdate! ${updateURL}`
   )}`

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
            <div className='text-neutral-400'>Posting update... </div>
         </div>
      )
   } else if (isSuccess) {
      return (
         <div className='w-2/3 mt-4 flex flex-col items-center bg-green-100 border-green-300 border py-5 px-12 gap-y-2 rounded'>
            <div className='text-green-800 text-lg'>{`Update posted!`}</div>
            <Link
               target='_blank'
               href={`https://etherscan.io/tx/${transactionData?.transactionHash}`}
               className='text-green-800 underline hover:cursor-pointer text-sm font-medium'
            >
               Txn Receipt
            </Link>
            <Link
               className='flex flex-row w-fit gap-x-2 px-3 py-1 bg-white shadow hover:shadow-md ease-in-out transition-all duration-200 rounded-md border w- fit'
               href={warpcast_URL}
               target='_blank'
            >
               <div>{`Share to Farcaster`}</div>
            </Link>
         </div>
      )
   }

   console.log(updateText)
   return (
      <div>
         <div className='flex flex-col items-start space-y-2 mt-4'>
            <div className='text-gray-800'>
               Updates are formatted in{' '}
               <Link
                  className='text-gray-500 hover:underline'
                  href='https://www.markdownguide.org/basic-syntax/'
                  target='_blank'
               >
                  Markdown
               </Link>
               . You can see a preview of your update below, or use another
               editor like{' '}
               <Link
                  className='text-gray-500 hover:underline'
                  href='https://stackedit.io/app#'
                  target='_blank'
               >
                  StackEdit
               </Link>
               .
            </div>
            <textarea
               className='mt-1 mb-4 rounded border border-neutral-200 w-full font-mono text-sm align-text-top overflow-auto p-3 h-32'
               name='updateText'
               id='updateText'
               onChange={(e) => {
                  setUpdateText(e.target.value)
               }}
               placeholder='Write your update here, formatted in Markdown!'
            />
            <div
               onClick={() => {
                  setShowPreview(!showPreview)
               }}
               className='flex flex-row text-gray-500 gap-x-1 items-center hover:cursor-pointer'
            >
               <div>Preview</div>
               <CaretDownIcon
                  className={`${
                     showPreview && 'rotate-180'
                  } ease-in-out transition-all`}
               />
            </div>
            {showPreview && (
               <ReactMarkdown
                  className='space-y-3 [&>*]:break-words [&>ul>li]:ml-2 propUpdateMarkdown prose w-full bg-white text-sm text-gray-600 p-4 font-mono'
                  linkTarget={'_blank'}
                  remarkPlugins={[remarkGfm, remarkBreaks]}
               >
                  {updateText}
               </ReactMarkdown>
            )}

            <div className='flex flex-row space-x-2 mb-4'>
               <input
                  type='checkbox'
                  className='w-fit rounded border border-neutral-200'
                  onChange={(e) => {
                     setCompleted(e.currentTarget.checked)
                  }}
               />
               <div className='text-gray-400'>
                  {`Mark proposal as completed.`}
                  <br></br>
                  {`This can't be undone, but you'll be able to keep posting updates`}
               </div>
            </div>

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
