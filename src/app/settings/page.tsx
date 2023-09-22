'use client'

import { LoadingNoggles } from '@/components/LoadingNoggles'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import useGetActions from '@/hooks/useGetActions'
import { Actions } from '@/components/Actions'
import { PageTitle } from '@/components/PageTitle'
import { CustomConnectButton } from '@/components/CustomConnectButton'

export default function AdminPage() {
   const data = 0

   const { isConnected, address } = useAccount()
   const { chain } = useNetwork()
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
         {isConnected && correctChain ? (
            actions ? (
               <Actions actions={actions} address={address!} />
            ) : (
               <LoadingNoggles />
            )
         ) : (
            <CustomConnectButton />
         )}
      </div>
   )
}
