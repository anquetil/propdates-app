'use client'

import { useAccount, useNetwork } from 'wagmi'
import useGetProp from '@/hooks/useGetProp'
import { LoadingNoggles } from '@/components/LoadingNoggles'
import { TransferAdminForm } from '@/components/TransferAdminForm'
import { PageTitle } from '@/components/PageTitle'
import { PostUpdateForm } from '@/components/PostUpdateForm'
import PropInfoPanel from '@/components/PropInfoPanel'
import { CustomConnectButton } from '@/components/CustomConnectButton'
import { zeroAddress } from 'viem'

export default function PropPage({ params }: { params: { prop: string } }) {
   const propId = Number(params.prop)
   const { prop, loading } = useGetProp(Number(propId), propId != -1000)

   const { isConnected, address } = useAccount()
   const { chain } = useNetwork()
   const correctChain = chain?.id === 1

   const formattedAddress = address?.toLowerCase()
   const isProposer = formattedAddress == prop.proposer
   const isUnclaimed = prop.admin == zeroAddress
   const canPost =
      prop &&
      isConnected &&
      correctChain &&
      (formattedAddress == prop.admin || (isProposer && isUnclaimed))

   if (loading) {
      return (
         <div>
            <PageTitle title={`Manage Prop #${propId}`} />
            <LoadingNoggles />
         </div>
      )
   }

   return (
      <div>
         <PageTitle title={`Manage Prop #${propId}`} />
         <div className='px-6 sm:px-10 flex flex-col-reverse gap-y-4 sm:flex-row max-w-full gap-x-10'>
            <div className='w-full sm:w-2/3 max-w-[900px] gap-y-4'>
               {isConnected && correctChain ? (
                  <TransferAdminForm connectedAddress={address!} prop={prop} />
               ) : (
                  <CustomConnectButton />
               )}
               {canPost && <PostUpdateForm prop={prop} />}
            </div>
            <PropInfoPanel prop={prop} />
         </div>
      </div>
   )
}
