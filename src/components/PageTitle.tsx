import { GearIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export function PageTitle({
   title,
   gear = false,
}: {
   title: string;
   gear?: boolean;
}) {
   return (
      <div className='flex flex-row justify-between items-center pr-1 pb-[30.5px] mb-10 border-b-2 border-slate-200'>
         <div
            className={`text-4xl ${
               gear ? 'text-red-500' : 'text-gray-800'
            } font-medium`}
         >
            {title}
         </div>
         {gear && (
            <Link
               href='/admin'
               className='text-gray-500 hover:text-gray-700 ease-in-out transition-all'
            >
               <GearIcon width={25} height={25} />
            </Link>
         )}
      </div>
   );
}
