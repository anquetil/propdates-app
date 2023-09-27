'use client'

import { AllUpdates } from '@/components/AllUpdates'
import { LoadingNoggles } from '@/components/LoadingNoggles'
import { PageTitle } from '@/components/PageTitle'
import { ProposalList } from '@/components/ProposalList'
import useGetUpdates from '@/hooks/useGetUpdates'

export default function Home() {
   const { updates } = useGetUpdates()

   return (
      <div className='pb-8'>
         <PageTitle title={'Write & read onchain updates'} tab={'HOME'} />

         <div className='px-6 sm:px-10'>
            <div className='flex flex-row space-x-10 mt-6 max-w-full'>
               <div className='w-full md:w-2/3 max-w-[900px]'>
                  {updates ? (
                     <AllUpdates updates={updates} context={true} />
                  ) : (
                     <LoadingNoggles />
                  )}
               </div>

               <ProposalList mini={true} />
            </div>
         </div>
      </div>
   )
}
