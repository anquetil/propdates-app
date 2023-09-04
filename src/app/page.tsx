'use client'

import { AllUpdates } from '@/components/AllUpdates'
import { LoadingNoggles } from '@/components/LoadingNoggles'
import { PageTitle } from '@/components/PageTitle'
import useGetUpdates from '@/hooks/useGetUpdates'

export default function Home() {
   const { updates } = useGetUpdates()

   return (
      <div>
         <PageTitle title={'Write & read onchain updates'} gear={true} />

         <div className='font-normal text-lg -mt-16 mb-12'>Propdates is an onchain system for Nouns proposal updates.</div>
         {updates ? (
            <AllUpdates updates={updates} context={true} />
         ) : (
            <LoadingNoggles />
         )}
      </div>
   )
}
