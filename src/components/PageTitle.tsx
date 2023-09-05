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
      <div className={`font-serif flex flex-row justify-between items-center pr-1 ${home ? 'mb-2' :'mb-8'}`}>
         {!home && <Link
            href='/'
            className='absolute top-8 text-gray-500 hover:text-gray-700 ease-in-out transition-all'
         >
            <HomeIcon width={25} height={25} />
         </Link>}
         <div
            className={`text-4xl ${
               home ? 'text-blue-900' : 'text-gray-800'
            } font-medium`}
         >
            {title}
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
