'use client'

import { PropUpdate } from '@/utils/types'
import { Address, useEnsAvatar, useEnsName } from 'wagmi'
import Link from 'next/link'
import { formatTimestampString } from '@/utils/funcs'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useEffect, useRef, useState } from 'react'
import remarkBreaks from 'remark-breaks'

export function PropUpdateCard({
   update,
   context = false,
   forceFull = false,
}: {
   update: PropUpdate
   context?: boolean
   forceFull?: boolean
}) {
   const [toast, setToast] = useState<boolean>(false)

   function copyToClipboard(id: string, nav: Navigator) {
      void nav.clipboard.writeText(`https://updates.wtf/update/${id}`)
   }

   const parentDivRef = useRef<HTMLDivElement>(null)
   const [collapsed, setCollapsed] = useState<boolean>(!forceFull)
   const [showExpandButton, setShowExpandButton] = useState(false)

   useEffect(() => {
      console.log(parentDivRef.current?.scrollHeight)
      const checkHeight = () => {
         if (forceFull || (parentDivRef.current?.scrollHeight || 0) < 192) {
            setShowExpandButton(false)
         } else {
            setShowExpandButton(true)
         }
      }

      console.log(forceFull)

      // Check the height on mount and on window resize
      checkHeight()
      window.addEventListener('resize', checkHeight)

      // Clean up the event listener
      return () => window.removeEventListener('resize', checkHeight)
   }, [forceFull])

   function handleClick() {
      copyToClipboard(id, navigator)
      setToast(true)
      setTimeout(function () {
         setToast(false)
      }, 1000)
   }

   const { data: ensName } = useEnsName({
      address: update.admin as Address,
   })

   const { data: ensAvatar } = useEnsAvatar({
      name: ensName,
   })

   const {
      id,
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

         <div
            className={`w-full bg-white rounded-xl border-slate-200 border font-normal`}
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
               <div className='flex flex-row gap-x-2 items-center'>
                  <div className='relative' onClick={handleClick}>
                     <div
                        className={`z-100 text-xs bottom-5 -translate-x-[40%] whitespace-nowrap py-1 w-fit absolute px-2 bg-black rounded-sm text-white ease-in-out transition-all duration-200 ${
                           toast
                              ? 'bg-opacity-90 text-opacity-90'
                              : 'bg-opacity-0 text-opacity-0'
                        }`}
                     >
                        {`Copied link!`}
                     </div>
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-4 h-4 text-gray-400 hover:cursor-pointer hover:text-gray-600 ease-in-out transition-all'
                     >
                        <path
                           strokeLinecap='round'
                           strokeLinejoin='round'
                           d='M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244'
                        />
                     </svg>
                  </div>
                  <Link
                     href={`https://etherscan.io/tx/${transactionHash}`}
                     target='_blank'
                     className={`hover:underline underline-offset-2 text-gray-400 text-sm`}
                  >
                     {formatTimestampString(blockTimestamp)}
                  </Link>
               </div>
            </div>

            <div
               ref={parentDivRef}
               className={` w-full bg-[#fcfcfc] text-gray-600 p-4 font-mono
               ${collapsed && 'max-h-48 overflow-hidden'} ${
                  !forceFull && 'rounded-b-xl'
               }`}
            >
               <ReactMarkdown
                  className='space-y-3 [&>*]:break-words [&>ul>li]:ml-2 prose propUpdateMarkdown  text-sm'
                  linkTarget={'_blank'}
                  remarkPlugins={[remarkGfm, remarkBreaks]}
               >
                  {textUpdate}
               </ReactMarkdown>
            </div>
            {showExpandButton && (
               <div
                  className='flex flex-row justify-center items-center w-full h-7 rounded-b-xl  text-slate-400 bg-slate-100 hover:bg-slate-200 hover:cursor-pointer ease-in-out transition-all duration-200'
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
