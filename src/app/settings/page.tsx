'use client'

import { LoadingNoggles } from '@/components/LoadingNoggles'
import { useAccount, useNetwork } from 'wagmi'
import useGetActions from '@/hooks/useGetActions'
import { AdminPanel } from '@/components/AdminPanel'
import { PageTitle } from '@/components/PageTitle'
import { CustomConnectButton } from '@/components/CustomConnectButton'

export default function AdminPage() {
   const accountData = useAccount()
   const { isConnected, address } = accountData
   const { chain, chains } = useNetwork()
   const correctChain = chain?.id === chains[0].id
   const { actions } = useGetActions(address!, isConnected)
   console.log('admin page actions:', actions)
   console.log('correct chain', correctChain)
   console.log('isConnected: ', isConnected)
   return (
      <div>
         <PageTitle title={`Settings`} tab={'MY PROPS'} />
         <div className='px-6 sm:px-10'>
            {isConnected && correctChain ? (
               actions ? (
                  <AdminPanel actions={actions} address={address!} />
               ) : (
                  <LoadingNoggles />
               )
            ) : (
               <CustomConnectButton />
            )}
         </div>
      </div>
   )
}
