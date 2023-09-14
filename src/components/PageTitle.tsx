import { GearIcon, HomeIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

export function PageTitle({
   title,
   home = false,
}: {
   title: string
   home?: boolean
}) {
   return (
      <div
         className={`font-serif flex flex-row justify-between items-center pr-1 ${
            home ? 'mb-2' : 'mb-8'
         }`}
      >
         <div className='flex flex-row space-x-2 items-center'>
            {!home && (
               <Link
                  href='/'
                  className='-mb-1 text-gray-500 hover:text-gray-700 h-fit ease-in-out transition-all'
               >
                  <HomeIcon width={25} height={25} />
               </Link>
            )}
            <div
               className={`text-3xl sm:text-4xl ${
                  home ? 'text-blue-900' : 'text-gray-800'
               } font-medium`}
            >
               {title}
            </div>
         </div>

         <Link
            href='/admin'
            className='text-gray-500 hover:text-gray-700 ease-in-out transition-all'
         >
            <GearIcon width={25} height={25} />
         </Link>
      </div>
   )
}
