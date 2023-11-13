'use client'

import { LoadingNoggles } from '@/components/LoadingNoggles'
import { useAccount, useNetwork } from 'wagmi'
import useGetActions from '@/hooks/useGetActions'
import { AdminPanel } from '@/components/AdminPanel'
import { PageTitle } from '@/components/PageTitle'
import { CustomConnectButton } from '@/components/CustomConnectButton'

export default function AdminPage() {
   const data = 0

   const accountData = useAccount()
   const { isConnected, address } = accountData
   const { chain } = useNetwork()
   const correctChain = chain?.id === 1
   const { actions } = useGetActions(address!, isConnected)
   if (data == undefined)
      return (
         <div>
            <LoadingNoggles />
         </div>
      )

   return (
      <div>
         <PageTitle title={`Settings`} />
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
