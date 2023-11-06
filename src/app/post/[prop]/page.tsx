'use client'

import { useAccount, useNetwork } from 'wagmi'
import useGetProp from '@/hooks/useGetProp'
import { LoadingNoggles } from '@/components/LoadingNoggles'
import { PageTitle } from '@/components/PageTitle'
import { PostUpdateForm } from '@/components/PostUpdateForm'
import PropInfoPanel from '@/components/PropInfoPanel'

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
         <div className='px-6 sm:px-10 flex flex-col-reverse gap-y-4 sm:flex-row max-w-full gap-x-10'>
            <div className='w-full sm:w-2/3 max-w-[900px] gap-y-4'>
               {canPost && <PostUpdateForm prop={prop} />}
            </div>
            <PropInfoPanel prop={prop} />
         </div>
      </div>
   )
}
