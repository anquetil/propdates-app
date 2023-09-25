import { isAddress } from 'viem'
import Link from 'next/link'
import useGetUpdates from '@/hooks/useGetUpdates'
import { useState } from 'react'
import AddressDisplay from './AddressDisplay'
import { formatTitle } from '@/utils/funcs'

type row = {
   item: string
   value: number
}

function indexOf(arr: row[], value: string): number | undefined {
   const i = arr.findIndex((e) => e.item === value)
   return i > -1 ? i : undefined
}

export function Leaderboard() {
   type tabType = 'ADMIN' | 'PROPOSAL' | 'PROPOSER'
   const [tab, setTab] = useState<tabType>('ADMIN')
   const { updates } = useGetUpdates()
   if (!updates) {
      return <></>
   }

   const byProposal: row[] = []
   const byAdmin: row[] = []
   const byProposer: row[] = []

   for (const u of updates) {
      const {
         admin,
         prop: { proposer, id, title },
      } = u
      const proposal = formatTitle(id, title)

      const adminIndex = indexOf(byAdmin, admin)
      const proposerIndex = indexOf(byProposer, proposer)
      const proposalIndex = indexOf(byProposal, proposal)
      if (adminIndex !== undefined) {
         byAdmin[adminIndex].value += 1
      } else {
         byAdmin.push({ item: admin, value: 1 })
      }

      if (proposerIndex !== undefined) {
         byProposer[proposerIndex].value += 1
      } else {
         byProposer.push({ item: proposer, value: 1 })
      }

      if (proposalIndex !== undefined) {
         byProposal[proposalIndex].value += 1
      } else {
         byProposal.push({ item: proposal, value: 1 })
      }
   }

   const sortedAdmin = [...byAdmin].sort((a, b) => (a.value > b.value ? -1 : 1))
   const sortedProposal = [...byProposal].sort((a, b) =>
      a.value > b.value ? -1 : 1
   )
   const sortedProposer = [...byProposer].sort((a, b) =>
      a.value > b.value ? -1 : 1
   )

   const displayLeaderboard =
      tab == 'ADMIN'
         ? sortedAdmin
         : tab == 'PROPOSAL'
         ? sortedProposal
         : sortedProposer

   return (
      <div className='ml-6 sm:ml-10 pt-1'>
         <div className='flex flex-row space-x-4 mb-4 '>
            <div
               className={`${
                  tab == 'ADMIN'
                     ? 'text-gray-800 border-b border-gray-800'
                     : 'text-gray-500'
               } hover:text-gray-800 hover:cursor-pointer`}
               onClick={() => setTab('ADMIN')}
            >
               BY ADMIN
            </div>
            <div
               className={`${
                  tab == 'PROPOSAL'
                     ? 'text-gray-800 border-b border-gray-800'
                     : 'text-gray-500'
               } hover:text-gray-800 hover:cursor-pointer`}
               onClick={() => setTab('PROPOSAL')}
            >
               BY PROPOSAL
            </div>
            <div
               className={`${
                  tab == 'PROPOSER'
                     ? 'text-gray-800 border-b border-gray-800'
                     : 'text-gray-500'
               } hover:text-gray-800 hover:cursor-pointer`}
               onClick={() => setTab('PROPOSER')}
            >
               BY PROPOSER
            </div>
         </div>
         <div className=''>
            {displayLeaderboard.map((r, i) => (
               <div
                  key={i}
                  className={`flex flex-row justify-between text-sm text-gray-700 space-x-6 ${
                     tab == 'PROPOSAL' ? 'w-64' : 'w-40'
                  }`}
               >
                  <div className={`truncate`}>
                     {isAddress(r.item) ? (
                        <AddressDisplay address={r.item} />
                     ) : (
                        <Link
                           className='hover:underline underline-offset-2'
                           href={`/prop/${r.item.substring(
                              1,
                              r.item.indexOf(':')
                           )}`}
                        >
                           {r.item}
                        </Link>
                     )}
                  </div>

                  <div>{r.value}</div>
               </div>
            ))}
         </div>
      </div>
   )
}
