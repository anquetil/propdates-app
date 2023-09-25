'use client'

import { PropUpdate } from '@/utils/types'
import { Address, useEnsAvatar, useEnsName } from 'wagmi'
import Link from 'next/link'
import { formatTimestampString } from '@/utils/funcs'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function PropUpdateCard({
   update,
   context = false,
}: {
   update: PropUpdate
   context?: boolean
}) {
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
         
         <div className='w-full bg-white rounded-xl border-slate-200 border font-normal'>
            <div className='flex flex-row justify-between border-b p-4 items-center'>
               <div className='flex flex-row items-center'>
                  <div className='rounded-full h-6 w-6 bg-gray-100'>
                     {// eslint-disable-next-line @next/next/no-img-element
                     <img
                        className='h6 w-6 rounded-full'
                        src={ensAvatar ?? 'https://pbs.twimg.com/profile_images/1467601380567359498/oKcnQo_S_400x400.jpg'}
                        alt={'avatar'}
                     />}
                  </div>
                  <div className='font-semibold ml-2'>{ensName ?? admin.substring(0, 7)}</div>
                  {isCompleted && <div className='bg-green-200 text-green-600 ml-4 py-1 px-2 rounded text-xs font-medium'>COMPLETED</div>}
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
               className={`propUpdateMarkdown w-full bg-[#fcfcfc] text-sm  rounded-xl text-gray-600 p-4 font-mono `}
            >
               <ReactMarkdown
                  className='space-y-3 [&>*]:break-words [&>ul>li]:ml-2'
                  linkTarget={'_blank'}
                  remarkPlugins={[remarkGfm]}
               >
                  {textUpdate}
               </ReactMarkdown>
            </div>
         </div>
      </div>
   )
}
