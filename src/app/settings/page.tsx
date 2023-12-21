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
   const { actions } = useGetActions(address!, isConnected)
   console.log('admin page actions:', actions)
   console.log('correct chain', chain?.id === chains[0]?.id)
   console.log('isConnected: ', isConnected)
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
