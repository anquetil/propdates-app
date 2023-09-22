import { GearIcon, HomeIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

export function PageTitle({ title, tab }: { title: string; tab?: string }) {
   const home = tab == 'HOME'
   const settings = tab == 'SETTINGS'
   const leaderboard = tab == 'LEADERBOARD'
   return (
      <div
         className={`flex flex-col justify-between items-start space-y-8 ${
            home ? 'mb-2' : 'mb-4'
         }`}
      >
         <div className='flex flex-row space-x-3 text-gray-700 font-medium'>
            <Link
               href='/'
               className={`ease-in-out transition-all ${
                  home ? ' cursor-default' : 'text-gray-400 hover:text-gray-700'
               }`}
            >
               HOME
            </Link>
            <Link
               href='/admin'
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
         </div>

         <div
            className={`text-3xl ${
               home
                  ? 'text-blue-800 font-serif font-medium sm:text-4xl'
                  : 'text-blue-800'
            }`}
         >
            {title}
         </div>
      </div>
   )
}
