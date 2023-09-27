'use client'

import { PropUpdate } from '@/utils/types'
import { Address, useEnsAvatar, useEnsName } from 'wagmi'
import Link from 'next/link'
import { formatTimestampString } from '@/utils/funcs'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useState } from 'react'

export function PropUpdateCard({
   update,
   context = false,
   collapsing = true,
}: {
   update: PropUpdate
   context?: boolean
   collapsing?: boolean
}) {
   const [collapsed, setCollapsed] = useState<boolean>(collapsing)
   const { data: ensName } = useEnsName({
      address: update.admin as Address,
   })

   const { data: ensAvatar } = useEnsAvatar({
      name: ensName,
   })

   const {
      prop,
      isCompleted,
      blockTimestamp,
      transactionHash,
      admin,
      update: textUpdate,
   } = update

   const long = textUpdate.length > 400 || textUpdate.includes('![')
   return (
      <div className='w-full flex flex-col'>
         {context && (
            <>
               <div className='text-sm text-gray-400'>#{prop.id}</div>
               <Link
                  href={`/prop/${prop?.id}`}
                  className='mb-1 text-gray-700 text-lg font-medium hover:underline underline-offset-2 hover:decoration-1 '
               >
                  {prop.title}
               </Link>
            </>
         )}

         <div
            className={`w-full bg-white rounded-xl border-slate-200 border font-normal overflow-hidden`}
         >
            <div className='flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:justify-between p-4 sm:items-center border-b '>
               <div className='flex flex-row items-center'>
                  {
                     // eslint-disable-next-line @next/next/no-img-element
                     <img
                        className='h6 w-6 rounded-full'
                        src={
                           ensAvatar ??
                           'https://pbs.twimg.com/profile_images/1467601380567359498/oKcnQo_S_400x400.jpg'
                        }
                        alt={'avatar'}
                     />
                  }
                  <div className='font-semibold ml-2'>
                     {ensName ?? admin.substring(0, 7)}
                  </div>
                  {isCompleted && (
                     <div className='bg-green-200 text-green-600 ml-4 py-1 px-2 rounded text-xs font-medium'>
                        COMPLETED
                     </div>
                  )}
               </div>
               <Link
                  href={`https://etherscan.io/tx/${transactionHash}`}
                  target='_blank'
                  className={`hover:underline underline-offset-2 text-gray-400 text-sm`}
               >
                  {formatTimestampString(blockTimestamp)}
               </Link>
            </div>

            <div
               className={`propUpdateMarkdown w-full bg-[#fcfcfc] text-sm text-gray-600 p-4 font-mono
               ${collapsed && 'max-h-48 overflow-hidden'} ${
                  (!collapsing || !long) && 'rounded-b-xl'
               }`}
            >
               <ReactMarkdown
                  className='space-y-3 [&>*]:break-words [&>ul>li]:ml-2'
                  linkTarget={'_blank'}
                  remarkPlugins={[remarkGfm]}
               >
                  {textUpdate}
               </ReactMarkdown>
            </div>
            {collapsing && long && (
               <div
                  className='flex flex-row justify-center items-center w-full h-7  text-slate-400 bg-slate-100 hover:bg-slate-200 hover:cursor-pointer ease-in-out transition-all duration-200'
                  onClick={() => setCollapsed(!collapsed)}
               >
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     fill='none'
                     viewBox='0 0 24 24'
                     strokeWidth={1.5}
                     stroke='currentColor'
                     className={`w-5 h-5 ${!collapsed && 'rotate-180'}`}
                  >
                     <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3'
                     />
                  </svg>
               </div>
            )}
         </div>
      </div>
   )
}
