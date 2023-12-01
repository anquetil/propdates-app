'use client'

import { useAccount, useNetwork } from 'wagmi'
import useGetProp from '@/hooks/useGetProp'
import { LoadingNoggles } from '@/components/LoadingNoggles'
import { PageTitle } from '@/components/PageTitle'
import { PostUpdateForm } from '@/components/PostUpdateForm'
import PropInfoPanel from '@/components/PropInfoPanel'
import { zeroAddress } from 'viem'

export default function PropPage({ params }: { params: { prop: string } }) {
   const propId = Number(params.prop)
   const { prop, loading } = useGetProp(Number(propId), propId != -1000)
   const isCompleted = prop ? prop.isCompleted : false
   const { isConnected, address } = useAccount()
   const { chain, chains } = useNetwork()
   const correctChain = chain?.id === chains[0].id
   const formattedAddress = address?.toLowerCase()
   const isProposer = prop && formattedAddress == prop.proposer
   const isUnclaimed = prop && prop.admin == zeroAddress
   const canPost =
      prop &&
      isConnected &&
      correctChain &&
      (formattedAddress == prop.admin || (isProposer && isUnclaimed))

   if (loading) {
      return (
         <div>
            <PageTitle title={`Post Update for Prop #${propId}`} />
            <LoadingNoggles />
         </div>
      )
   }

   console.log(canPost)
   return (
      <div>
         <PageTitle title={`Post Update for Prop #${propId}`} />
         <div className='px-6 sm:px-10 flex flex-col-reverse gap-y-4 sm:flex-row max-w-full gap-x-10'>
            <div className='w-full sm:w-2/3 max-w-[900px] gap-y-4'>
               {canPost && (
                  <PostUpdateForm prop={prop} isCompleted={isCompleted} />
               )}
            </div>
            <PropInfoPanel prop={prop} />
         </div>
      </div>
   )
}
