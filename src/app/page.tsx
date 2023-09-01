'use client'

import { AllUpdates } from '@/components/AllUpdates'
import { LoadingNoggles } from '@/components/LoadingNoggles'
import { PageTitle } from '@/components/PageTitle'
import useGetUpdates from '@/hooks/useGetUpdates'

export default function Home() {
   const { updates } = useGetUpdates()

   return (
      <div>
         <PageTitle title={'🚧 Propdates'} gear={true} />

         <div className='w-full flex items-center'></div>
         {updates ? (
            <AllUpdates updates={updates} context={true} />
         ) : (
            <LoadingNoggles />
         )}
      </div>
   )
}
