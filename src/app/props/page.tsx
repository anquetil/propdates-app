'use client'

import { PageTitle } from '@/components/PageTitle'
import { ProposalList } from '@/components/ProposalList'

export default function LeaderboardPage() {
   return (
      <div>
         <PageTitle title={`All Proposals`} tab={'ALL PROPS'} />
         <div className='w-full px-4 sm:px-8'>
            <ProposalList />
         </div>
      </div>
   )
}
