'use client'

import { AllUpdates } from '@/components/AllUpdates'
import { LoadingNoggles } from '@/components/LoadingNoggles'
import { PageTitle } from '@/components/PageTitle'
import useGetUpdates from '@/hooks/useGetUpdates'

export default function Home() {
   const { updates } = useGetUpdates()

   return (
      <div>
         <PageTitle title={'Write & read onchain updates'} home={true} />

         <div className='font-normal text-lg mb-6 text-gray-800'>Propdates is the easiest way to keep up with funded Nouns proposals</div>
         {updates ? (
            <AllUpdates updates={updates} context={true} />
         ) : (
            <LoadingNoggles />
         )}
      </div>
   )
}
