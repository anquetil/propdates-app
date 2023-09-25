'use client'

import { LoadingNoggles } from '@/components/LoadingNoggles'
import { useAccount, useNetwork } from 'wagmi'
import useGetActions from '@/hooks/useGetActions'
import { Actions } from '@/components/Actions'
import { PageTitle } from '@/components/PageTitle'
import { CustomConnectButton } from '@/components/CustomConnectButton'

export default function AdminPage() {
   const data = 0

   const { isConnected, address } = useAccount()
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
         <PageTitle title={`Settings`} tab={'SETTINGS'} />
         <div className='px-6 sm:px-10'>
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
      </div>
   )
}
