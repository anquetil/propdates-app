'use client'

import { IBM_Plex_Mono } from 'next/font/google'
import { LoadingNoggles } from '@/components/LoadingNoggles'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Address, useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import useGetActions from '@/hooks/useGetActions'
import { Actions } from '@/components/Actions'
import Link from 'next/link'
import { PageTitle } from '@/components/PageTitle'
const mono = IBM_Plex_Mono({
   subsets: ['latin'],
   weight: ['100', '200', '300', '400', '500', '600', '700'],
})

export default function AdminPage() {
   const data = 0

   const { isConnected, address } = useAccount()
   const { chain } = useNetwork()
   const { switchNetwork } = useSwitchNetwork()
   const correctChain = chain?.id === 1

   const { actions, loading } = useGetActions(address!, isConnected)

   if (data == undefined)
      return (
         <div>
            <LoadingNoggles />
         </div>
      )

   return (
      <div>
         <PageTitle title={`SETTINGS`} settings={true} />

         {!isConnected ? (
            <ConnectButton showBalance={false} accountStatus='avatar' />
         ) : !correctChain ? (
            <button
               className='w-[150px]  border-blue-500 rounded-sm border-[1px] p-2 shadow-md bg-blue-600 hover:bg-blue-500 ease-in-out transition-all active:mt-[2px] active:mb-[-2px]'
               onClick={() => switchNetwork?.(1)}
            >
               <div className='text-opacity-90 text-sm text-white'>
                  Switch to Mainnet
               </div>
            </button>
         ) : actions ? (
            <Actions actions={actions} address={address!} />
         ) : (
            <LoadingNoggles />
         )}
      </div>
   )
}
