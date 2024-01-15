'use client'

import { LoadingNoggles } from '@/components/LoadingNoggles'
import { useAccount, useNetwork } from 'wagmi'
import useGetActions from '@/hooks/useGetActions'
import { AdminPanel } from '@/components/AdminPanel'
import { PageTitle } from '@/components/PageTitle'
import { CustomConnectButton } from '@/components/CustomConnectButton'
import { TEST_ADDRESS } from '@/utils/addresses'

export default function AdminPage() {
   const accountData = useAccount()
   const { isConnected } = accountData
   const address = TEST_ADDRESS.noun40
   const { chain, chains } = useNetwork()
   const { actions } = useGetActions(address!, isConnected)
   return (
      <div>
         <PageTitle title={`Settings`} tab={'MY PROPS'} />
         <div className='px-6 sm:px-10'>
            {isConnected && chain?.id === chains[0]?.id ? (
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
