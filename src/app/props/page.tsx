'use client'

import { PageTitle } from '@/components/PageTitle'
import { ProposalList } from '@/components/ProposalList'

export default function LeaderboardPage() {
   return (
      <div>
         <PageTitle title={`All Proposals`} />
         <ProposalList />
      </div>
   )
}
