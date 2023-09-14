'use client'

import { IBM_Plex_Mono } from 'next/font/google'
import { PropUpdate } from '@/utils/types'
import { Address, useEnsName } from 'wagmi'
import Link from 'next/link'
import { formatTimestampString } from '@/utils/funcs'
import ReactMarkdown from 'react-markdown'

export function PropUpdateCard({
   update,
   context = false,
}: {
   update: PropUpdate
   context?: boolean
}) {
   const { data: ensData } = useEnsName({
      address: update.admin as Address,
   })

   return (
      <div className='w-full bg-white rounded-lg border-slate-200 border-[1px] p-4 font-normal'>
         <div>
            <span className='font-semibold'>
               {ensData ?? update.admin.substring(0, 7)}
            </span>
            {context && (
               <>
                  {` shared an update on proposal `}
                  <Link
                     href={`/prop/${update.prop?.id}`}
                     className='text-blue-700 hover:underline'
                  >{`#${update.prop?.id} - ${update.prop.title}`}</Link>
               </>
            )}
         </div>
         <div className={`text-gray-400 text-sm`}>
            {formatTimestampString(update.blockTimestamp)}
            {` | `}
            <a
               className='hover:underline'
               href={`https://etherscan.io/tx/${update.transactionHash}`}
               target='_blank'
            >
               {update.transactionHash.substring(0, 5)}...
               {update.transactionHash.substring(63, 66)}
            </a>
         </div>
         <div
            className={`propUpdateMarkdown w-full mt-4 rounded-md text-sm bg-gray-100 border-gray-300 text-gray-600 p-4 font-mono`}
         >
            <ReactMarkdown className='space-y-3' linkTarget={'_blank'}>
               {update.update}
            </ReactMarkdown>
         </div>
      </div>
   )
}
