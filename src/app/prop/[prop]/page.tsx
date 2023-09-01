'use client';

import { IBM_Plex_Mono } from 'next/font/google';
import { useEnsName } from 'wagmi';
import Link from 'next/link';
import useGetProp from '@/hooks/useGetProp';
import { LoadingNoggles } from '@/components/LoadingNoggles';
import { AllUpdates } from '@/components/AllUpdates';
import { zeroAddress } from '@/utils/types';
const mono = IBM_Plex_Mono({
   subsets: ['latin'],
   weight: ['100', '200', '300', '400', '500', '600', '700'],
});

export default function PropPage({ params }: { params: { prop: string } }) {
   const propId = Number(params.prop);
   const { prop, loading } = useGetProp(Number(propId), propId != -1000);

   const { data: adminENS } = useEnsName({
      address: prop ? prop.admin : zeroAddress,
      enabled: prop != undefined && prop.admin != zeroAddress,
   });
   const { data: proposerENS } = useEnsName({
      address: prop ? prop.proposer : zeroAddress,
      enabled: prop != undefined,
   });
   const unclaimed = !loading && prop.admin == zeroAddress;

   if (loading) {
      return (
         <main className='flex min-h-screen flex-col w-3/4 border-x-[1px] border-neutral-200 bg-white px-8 pt-8 pb-4'>
            <div className={`${mono.className} text-4xl font-semibold mb-8`}>
               {propId} - {prop?.title}
            </div>
            <LoadingNoggles />
         </main>
      );
   }
   return (
      <main className='flex min-h-screen flex-col w-3/4 border-x-[1px] border-neutral-200 bg-white px-8 pt-8 pb-4'>
         <div className={`${mono.className} text-4xl font-semibold mb-8`}>
            {propId} - {prop?.title}
         </div>

         <div className='flex flex-col space-y-1 text-md text-gray-500'>
            <div>Proposer: {proposerENS ?? prop.proposer.substring(0, 7)}</div>
            {unclaimed ? (
               <div className='flex flex-row space-x-2 w-fit p-3 bg-yellow-100 text-yellow-600 border-[1px] border-yellow-300 rounded'>
                  <div>⚠️</div>
                  <div>
                     Unclaimed admin role - is this you?{' '}
                     <Link
                        className='text-yellow-600 hover:text-yellow-800 underline'
                        href='/admin'
                     >
                        Claim here
                     </Link>
                  </div>
               </div>
            ) : (
               <div>
                  <div>Updates: {adminENS ?? prop.admin.substring(0, 7)}</div>
                  <div>
                     {prop.isCompleted ? '✅ Completed' : '⏳ Incomplete'}
                  </div>
               </div>
            )}
         </div>
         {prop && <AllUpdates updates={prop.updates} />}
         <div></div>
      </main>
   );
}
