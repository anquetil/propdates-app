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
   const unclaimed = !loading && (prop.admin == zeroAddress && prop.pendingAdmin == zeroAddress)

   if (loading) {
      return (
         <div>
            <PageTitle title={`${propId}`} />
            <LoadingNoggles />
         </div>
      )
   }
   return (
      <div>
         <PageTitle title={`${propId} - ${prop?.title}`} gear={false} />

         <div className='flex flex-col space-y-1 text-md text-gray-500'>
            {
               unclaimed && (
                  <div className='flex flex-row space-x-2 w-fit p-3 bg-yellow-100 text-yellow-600 border-[1px] border-yellow-300 rounded'>
                     <div>⚠️</div>
                     <div>
                        Unclaimed admin role - is this you?{' '}
                        <Link
                           className='text-yellow-600 hover:text-yellow-800 underline'
                           href='/admin'
                        >
                           Claim here
                        </Link>
                     </div>
                  </div>
               ) /*: (
               {/*<div className='flex flex-row mb-4 space-x-3'>
                  <div className="font-semibold">ADMIN</div>
                  <div className="">{adminENS ?? prop.admin.substring(0, 7)}</div>
                  {prop.isCompleted && <div>✅ Completed</div>}
               </div>}
            )*/
            }
         </div>
         {prop && <AllUpdates updates={prop.updates} />}
         <div></div>
      </div>
   )
}
