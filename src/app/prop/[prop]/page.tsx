'use client'

import { IBM_Plex_Mono } from 'next/font/google'
import { useEnsName } from 'wagmi'
import Link from 'next/link'
import useGetProp from '@/hooks/useGetProp'
import { LoadingNoggles } from '@/components/LoadingNoggles'
import { AllUpdates } from '@/components/AllUpdates'
import { zeroAddress } from '@/utils/types'
import { PersonIcon } from '@radix-ui/react-icons'
import { PageTitle } from '@/components/PageTitle'
const mono = IBM_Plex_Mono({
   subsets: ['latin'],
   weight: ['100', '200', '300', '400', '500', '600', '700'],
})

export default function PropPage({ params }: { params: { prop: string } }) {
   const propId = Number(params.prop)
   const { prop, loading } = useGetProp(Number(propId), propId != -1000)

   const { data: adminENS } = useEnsName({
      address: prop ? prop.admin : zeroAddress,
      enabled: prop != undefined && prop.admin != zeroAddress,
   })
   /*const { data: proposerENS } = useEnsName({
      address: prop ? prop.proposer : zeroAddress,
      enabled: prop != undefined,
   });*/
   const unclaimed =
      !loading && prop.admin == zeroAddress && prop.pendingAdmin == zeroAddress

   if (loading) {
      return (
         <div>
            <PageTitle title={`#${propId}:`} />
            <LoadingNoggles />
         </div>
      )
   }
   return (
      <div>
         <PageTitle title={`#${propId}: ${prop?.title}`} home={false} />
         {prop.isCompleted && (
            <div className='mb-8'>
               ✅
               <span className='italic text-gray-500'>{` This proposal's work was marked as completed by the admin`}</span>
            </div>
         )}

         <div className='flex flex-col space-y-1 text-md text-gray-500'>
            {(unclaimed || prop.updates.length == 0) && (
               <div className='flex flex-row space-x-2 w-fit p-3 bg-yellow-100 text-yellow-600 border-[1px] border-yellow-300 rounded'>
                  <div>⚠️</div>
                  <div>
                     No posts yet - is this you?{' '}
                     <Link
                        className='text-yellow-600 hover:text-yellow-800 underline'
                        href='/admin'
                     >
                        Claim and write here
                     </Link>
                  </div>
               </div>
            )}
         </div>
         {prop && <AllUpdates updates={prop.updates} />}
         <div></div>
      </div>
   )
}
