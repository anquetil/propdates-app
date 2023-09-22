'use client'

import { LoadingNoggles } from '@/components/LoadingNoggles'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import useGetActions from '@/hooks/useGetActions'
import { Actions } from '@/components/Actions'
import { PageTitle } from '@/components/PageTitle'

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
         <PageTitle title={`Settings`} tab={'SETTINGS'} />

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
