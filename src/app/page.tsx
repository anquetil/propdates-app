'use client'

import { AllUpdates } from '@/components/AllUpdates'
import { LoadingNoggles } from '@/components/LoadingNoggles'
import { PageTitle } from '@/components/PageTitle'
import useGetUpdates from '@/hooks/useGetUpdates'
import { GearIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Home() {
   const { updates } = useGetUpdates()
   const { isConnected, address } = useAccount()

   return (
      <div>
         <PageTitle title={'🚧 Propdates'} gear={true} />

         <div className='w-full flex items-center'>
            {isConnected ? (
               <div></div>
            ) : (
               <ConnectButton showBalance={false} accountStatus='avatar' />
            )}
         </div>
         {updates ? (
            <AllUpdates updates={updates} context={true} />
         ) : (
            <LoadingNoggles />
         )}
      </div>
   )
}
