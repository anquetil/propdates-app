'use client'

import { IBM_Plex_Mono } from 'next/font/google'
import {
   useAccount,
   useEnsName,
   useNetwork,
   useSwitchNetwork,
} from 'wagmi'
import useGetProp from '@/hooks/useGetProp'
import { LoadingNoggles } from '@/components/LoadingNoggles'
import { zeroAddress } from '@/utils/types'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { TransferAdminForm } from '@/components/TransferAdminForm'
import { PageTitle } from '@/components/PageTitle'
import { PostUpdateForm } from '@/components/PostUpdateForm'
const mono = IBM_Plex_Mono({
   subsets: ['latin'],
   weight: ['100', '200', '300', '400', '500', '600', '700'],
})

export default function PropPage({ params }: { params: { prop: string } }) {
   const propId = Number(params.prop)
   const { prop, loading } = useGetProp(Number(propId), propId != -1000)

   const { isConnected, address } = useAccount()
   const { chain } = useNetwork()
   const { switchNetwork } = useSwitchNetwork()
   const correctChain = chain?.id === 1

   const { data: adminENS } = useEnsName({
      address: prop ? prop.admin : zeroAddress,
      enabled: prop != undefined && prop.admin != zeroAddress,
   })
   const { data: proposerENS } = useEnsName({
      address: prop ? prop.proposer : zeroAddress,
      enabled: prop != undefined,
   })
   const { data: pendingAdminENS } = useEnsName({
      address: prop ? prop.pendingAdmin : zeroAddress,
      enabled: prop != undefined,
   })

   const unclaimed = !loading && prop.admin == zeroAddress
   const canPost =
      prop &&
      isConnected &&
      correctChain &&
      (address?.toLowerCase() == prop.admin.toLowerCase() ||
         address?.toLowerCase() == prop.pendingAdmin.toLowerCase())



   if (loading) {
      return (
         <div>
            <PageTitle title={`Manage Prop #${propId}`} />
            <LoadingNoggles />
         </div>
      )
   }

   const unclaimedPending = unclaimed && prop.transferPending
   const unclaimedNotPending = unclaimed && !prop.transferPending
   const adminString = unclaimedNotPending
      ? `Unclaimed`
      : unclaimedPending ? `Current: 0x0` : `Current: ${prop.admin} ${adminENS ? `(${adminENS})` : ''}`

   return (
      <div>
         <PageTitle title={`Manage Prop #${propId}`} />

         <div className='flex flex-col text-md text-gray-700 border-b-2 -mt-4 pb-6 border-slate-200 mb-4'>
            <div className='font-semibold'>Proposer:</div>
            <div className='mb-2'>{`${prop.proposer} ${
               proposerENS ? `(${proposerENS})` : ''
            }`}</div>
            <div className='font-semibold'>Admin:</div>
            <div>
               {adminString}
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
                  Switch to mainnet
               </div>
            </button>
         ) : (
            <TransferAdminForm connectedAddress={address!} prop={prop} />
         )}
         {canPost && <PostUpdateForm prop={prop} />}
      </div>
   )
}
