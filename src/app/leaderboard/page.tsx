'use client'

import { Leaderboard } from '@/components/Leaderboard'
import { PageTitle } from '@/components/PageTitle'

export default function LeaderboardPage() {
   return (
      <div>
         <PageTitle title={`Leaderboard`} tab={'LEADERBOARD'} />

         <Leaderboard />
      </div>
   )
}
