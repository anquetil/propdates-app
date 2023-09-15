import { GearIcon, HomeIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

export function PageTitle({
   title,
   home = false,
   settings = false,
}: {
   title: string
   home?: boolean
   settings?: boolean
}) {
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
                  home ? ' cursor-default' : 'text-gray-500 hover:text-gray-700'
               }`}
            >
               HOME
            </Link>
            <Link
               href='/admin'
               className={` ease-in-out transition-all ${
                  settings
                     ? 'cursor-default'
                     : 'text-gray-500 hover:text-gray-700'
               }`}
            >
               SETTINGS
            </Link>
         </div>

         <div
            className={`text-3xl ${
               home ? 'text-blue-800 font-serif font-medium sm:text-4xl' : 'text-blue-800'
            }`}
         >
            {title}
         </div>
      </div>
   )
}
