import Link from 'next/link'
import { CustomConnectButton } from './CustomConnectButton'

export function PageTitle({ title, tab }: { title: string; tab?: string }) {
   const home = tab == 'HOME'
   const settings = tab == 'SETTINGS'
   const leaderboard = tab == 'LEADERBOARD'
   const about = tab == 'HOW IT WORKS'
   return (
      <div
         className={`w-screen bg-white py-4 px-10 flex flex-col justify-between items-start ${
            home ? 'mb-2' : 'mb-4'
         }`}
      >
         <div className='w-full flex flex-col-reverse gap-y-3 sm:gap-y-0 sm:flex-row sm:justify-between'>
            <div className='flex flex-row space-x-3 text-gray-700 font-medium items-center'>
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
                  SETTINGS
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
            className={`mt-6: sm:mt-8 text-3xl ${
               home
                  ? 'text-blue-800 font-serif font-medium sm:text-4xl'
                  : 'text-blue-800'
            }`}
         >
            {title}
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
