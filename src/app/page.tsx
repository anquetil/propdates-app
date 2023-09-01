'use client';

import { AllUpdates } from '@/components/AllUpdates';
import { LoadingNoggles } from '@/components/LoadingNoggles';
import useGetUpdates from '@/hooks/useGetUpdates';

export default function Home() {
   const { updates } = useGetUpdates();

   return (
      <main className='flex min-h-screen flex-col w-3/4 border-x-[1px] border-neutral-200 bg-white px-4 pt-8 pb-4 shadow-sm'>
         <div className='flex'>
            <div className='text-4xl font-semibold text-red-500 mb-10'>
               🚧 PROPDATES
            </div>
         </div>

         {updates ? (
            <AllUpdates updates={updates} context={true} />
         ) : (
            <LoadingNoggles />
         )}
      </main>
   );
}
