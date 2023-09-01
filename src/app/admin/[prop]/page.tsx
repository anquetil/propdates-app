'use client';

import { IBM_Plex_Mono } from 'next/font/google';
import {
   Address,
   useAccount,
   useEnsName,
   useNetwork,
   useSwitchNetwork,
} from 'wagmi';
import Link from 'next/link';
import useGetProp from '@/hooks/useGetProp';
import { LoadingNoggles } from '@/components/LoadingNoggles';
import { zeroAddress } from '@/utils/types';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { TransferAdminForm } from '@/components/TransferAdminForm';
const mono = IBM_Plex_Mono({
   subsets: ['latin'],
   weight: ['100', '200', '300', '400', '500', '600', '700'],
});

export default function PropPage({ params }: { params: { prop: string } }) {
   const propId = Number(params.prop);
   const { prop, loading } = useGetProp(Number(propId), propId != -1000);

   const { isConnected, address } = useAccount();
   const { chain } = useNetwork();
   const { switchNetwork } = useSwitchNetwork();
   const correctChain = chain?.id === 1;

   const { data: adminENS } = useEnsName({
      address: prop ? prop.admin : zeroAddress,
      enabled: prop != undefined && prop.admin != zeroAddress,
   });
   const { data: proposerENS } = useEnsName({
      address: prop ? prop.proposer : zeroAddress,
      enabled: prop != undefined,
   });
   const { data: pendingAdminENS } = useEnsName({
      address: prop ? prop.pendingAdmin : zeroAddress,
      enabled: prop != undefined,
   });

   address;
   const unclaimed = !loading && prop.admin == zeroAddress;

   if (loading) {
      return (
         <main className='flex min-h-screen flex-col w-3/4 border-x-[1px] border-neutral-200 bg-white px-8 pt-8 pb-4'>
            <Link href='/admin'>←</Link>
            <div className={`${mono.className} text-4xl font-semibold mb-8`}>
               Manage Prop #{propId}
            </div>
            <LoadingNoggles />
         </main>
      );
   }
   return (
      <main className='flex min-h-screen flex-col w-3/4 border-x-[1px] border-neutral-200 bg-white px-8 pt-8 pb-4'>
         <Link className='hover:underline mb-3' href='/admin'>
            ← back to Admin
         </Link>
         <div className={`${mono.className} text-4xl font-semibold mb-8`}>
            Manage Prop #{propId}
         </div>

         <div className='flex flex-col text-md text-gray-700 border-b-[1.5px] border-neutral-300 mb-4'>
            <div className='font-semibold'>Proposer:</div>
            <div className='mb-2'>{`${prop.proposer} ${
               proposerENS ? `(${proposerENS})` : ''
            }`}</div>
            <div className='font-semibold'>Admin:</div>
            <div className='mb-2'>
               {unclaimed
                  ? `Unclaimed`
                  : `${prop.admin} ${adminENS ? `(${adminENS})` : ''}`}
            </div>
            <div>
               {prop.transferPending
                  ? `Pending: ${prop.pendingAdmin} ${
                       pendingAdminENS ? `(${pendingAdminENS})` : ''
                    }`
                  : ``}
            </div>
         </div>
         {!isConnected ? (
            <ConnectButton showBalance={false} accountStatus='avatar' />
         ) : !correctChain ? (
            <button
               className='w-[150px] border-blue-500 rounded-sm border-[1px] p-2 shadow-md bg-blue-600 hover:bg-blue-500 ease-in-out transition-all active:mt-[2px] active:mb-[-2px]'
               onClick={() => switchNetwork?.(1)}
            >
               <div className='text-opacity-90 text-sm text-white'>
                  Switch to Mainnet
               </div>
            </button>
         ) : (
            <TransferAdminForm connectedAddress={address!} prop={prop} />
         )}
      </main>
   );
}
