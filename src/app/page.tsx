'use client'

import { AllUpdates } from '@/components/AllUpdates'
import { Leaderboard } from '@/components/Leaderboard'
import { LoadingNoggles } from '@/components/LoadingNoggles'
import { PageTitle } from '@/components/PageTitle'
import { ProposalList } from '@/components/ProposalList'
import useGetUpdates from '@/hooks/useGetUpdates'
import Link from 'next/link'

export default function Home() {
   const { updates } = useGetUpdates()

   return (
      <div>
         <PageTitle title={'Write & read onchain updates'} tab={'HOME'} />

         <div className='font-normal text-lg text-gray-800'>
            Propdates is the easiest way to keep up with funded Nouns proposals.
         </div>
         <Link
            href='/about'
            className='font-normal text-gray-500 underline-offset-2 hover:underline'
         >
            {` How it works →`}
         </Link>

         <ProposalList />
         <div className='mb-6'></div>

         {updates ? (
            <AllUpdates updates={updates} context={true} />
         ) : (
            <LoadingNoggles />
         )}
      </div>
   )
}
