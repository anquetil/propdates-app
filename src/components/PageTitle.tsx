import Link from 'next/link'
import { CustomConnectButton } from './CustomConnectButton'
import { PropUpdate } from '@/utils/types'
import { getUpdateNumFromID, ordinals } from '@/utils/funcs'

export function PageTitle({
   title,
   tab,
   updateObj,
}: {
   title: string
   tab?: string
   updateObj?: PropUpdate
}) {
   const home = tab == 'HOME'
   const settings = tab == 'SETTINGS'
   const leaderboard = tab == 'LEADERBOARD'
   const about = tab == 'HOW IT WORKS'
   let updateNum = 0
   if (updateObj) {
      updateNum = Number(getUpdateNumFromID(updateObj.id))
   }
   return (
      <div
         className={`w-screen bg-white py-4 px-6 sm:px-10 flex flex-col justify-between items-start ${
            home ? 'mb-2' : 'mb-4'
         }`}
      >
         <div className='w-full flex flex-col-reverse gap-y-3 sm:gap-y-0 sm:flex-row sm:justify-between'>
            <div className='flex flex-row flex-wrap gap-x-3 text-gray-700 font-medium items-center my-4 sm:my-0'>
               <Link
                  href='/'
                  className={`ease-in-out transition-all ${
                     home
                        ? ' cursor-default'
                        : 'text-gray-400 hover:text-gray-700'
                  }`}
               >
                  HOME
               </Link>
               <Link
                  href='/settings'
                  className={` ease-in-out transition-all ${
                     settings
                        ? 'cursor-default'
                        : 'text-gray-400 hover:text-gray-700'
                  }`}
               >
                  POST
               </Link>
               <Link
                  href='/leaderboard'
                  className={` ease-in-out transition-all ${
                     leaderboard
                        ? 'cursor-default'
                        : 'text-gray-400 hover:text-gray-700'
                  }`}
               >
                  LEADERBOARD
               </Link>
               <Link
                  href='/about'
                  className={` ease-in-out transition-all ${
                     about
                        ? 'cursor-default'
                        : 'text-gray-400 hover:text-gray-700'
                  }`}
               >
                  HOW IT WORKS
               </Link>
            </div>
            <CustomConnectButton />
         </div>

         <div
            className={`flex flex-row items-center gap-x-2 mt-6 sm:mt-8  sm:max-w-[75%]`}
         >
            {updateObj && (
               <Link
                  className='text-blue-800 p-2 rounded-full hover:bg-gray-100 ease-in-out transition-all'
                  href={`/prop/${updateObj.prop.id}`}
               >
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     fill='none'
                     viewBox='0 0 24 24'
                     strokeWidth={3}
                     stroke='currentColor'
                     className='w-6 h-6'
                  >
                     <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'
                     />
                  </svg>
               </Link>
            )}

            <div
               className={`text-3xl font-medium ${
                  home
                     ? 'text-blue-800 font-serif font-medium sm:text-4xl'
                     : 'text-blue-800'
               }`}
            >
               {title}
               {updateObj && (
                  <div className='text-gray-500 font-normal text-base'>
                     {ordinals(updateNum)} Update
                  </div>
               )}
            </div>
         </div>
         {home && (
            <div className='font-normal text-md text-gray-800 pb-4'>
               Propdates is the easiest way to keep up with funded Nouns
               proposals.
            </div>
         )}
      </div>
   )
}
