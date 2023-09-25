'use client'

import { useAccount, useNetwork } from 'wagmi'
import useGetProp from '@/hooks/useGetProp'
import { LoadingNoggles } from '@/components/LoadingNoggles'
import { TransferAdminForm } from '@/components/TransferAdminForm'
import { PageTitle } from '@/components/PageTitle'
import { PostUpdateForm } from '@/components/PostUpdateForm'
import PropInfoPanel from '@/components/PropInfoPanel'
import { CustomConnectButton } from '@/components/CustomConnectButton'

export default function PropPage({ params }: { params: { prop: string } }) {
   const propId = Number(params.prop)
   const { prop, loading } = useGetProp(Number(propId), propId != -1000)

   const { isConnected, address } = useAccount()
   const { chain } = useNetwork()
   const correctChain = chain?.id === 1

   const canPost =
      prop &&
      isConnected &&
      correctChain &&
      (address?.toLowerCase() == prop.admin.toLowerCase() ||
         address?.toLowerCase() == prop.pendingAdmin.toLowerCase())

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
         <PropInfoPanel prop={prop} />
         {isConnected && correctChain ? (
            <TransferAdminForm connectedAddress={address!} prop={prop} />
         ) : (
            <CustomConnectButton />
         )}
         {canPost && <PostUpdateForm prop={prop} />}
      </div>
   )
}
