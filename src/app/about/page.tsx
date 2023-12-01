'use client'

import { PageTitle } from '@/components/PageTitle'
import ReactMarkdown from 'react-markdown'
import { PropUpdate } from '@/utils/types'
import { formatDate } from '@/utils/funcs'
import useGetUpdates from '@/hooks/useGetUpdates'

function makeTableArray(
   updates: PropUpdate[]
): { date: Date; count: number }[] {
   console.log('makeTableArray. update length: ', updates.length)
   const diff = 7 * 24 * 60 * 60 * 1000
   let thisMonday = new Date(2023, 8, 4) // Sept. 4
   let nextMonday = new Date(thisMonday.getTime() + diff)

   let result: { date: Date; count: number }[] = [
      { date: thisMonday, count: 0 },
   ]
   const sortedProps = [...updates].sort((a, b) =>
      a.blockTimestamp < b.blockTimestamp ? -1 : 1
   )
   const maxDate = new Date(
      Number(sortedProps[sortedProps.length - 1].blockTimestamp) * 1000
   )
   let i = 1 // ignore the first prop, wilson's

   while (
      nextMonday < new Date(maxDate.getTime() + diff) &&
      i < sortedProps.length
   ) {
      // haven't gone through all props
      const thisDate = new Date(Number(sortedProps[i].blockTimestamp) * 1000)
      console.log('i: ', i, 'date: ', thisDate)

      if (thisDate > thisMonday && thisDate < nextMonday) {
         console.log('adding')
         console.log(thisDate)
         result[result.length - 1].count += 1
         i++
      } else if (thisDate > nextMonday) {
         thisMonday = nextMonday
         result.push({ date: thisMonday, count: 0 })
         nextMonday = new Date(nextMonday.getTime() + diff)
      }
   }

   return result
}

export default function AboutPage() {
   let md = `Propdates enables Nouns DAO to stay updated on its contributors' work.`
   md += '\n\n## How it works'
   md +=
      '\nThe proposer of any onchain proposal can post updates or transfer the admin role via the [settings page](/settings).'
   md +=
      ' Once someone is the admin, they can transfer the role to anyone else. The gas fees of all proposals updates are automatically refunded by the contract.'
   md += `\n\n**Can't get in touch with the person who initially put your proposal onchain? DM [Martin](https://twitter.com/anquetil) on Twitter and he can transfer the prop to you!**`
   md += `\n\nContract: [0x94b4...d5f1](https://etherscan.io/address/0x94b4fb16893c0fb4e470eef2559c24fd87fed5f1)`

   const { updates } = useGetUpdates()
   const table = updates ? makeTableArray(updates) : []
   console.log(table)

   return (
      <div className=''>
         <PageTitle title={'What is Propdates?'} tab={'ABOUT'} />

         <div className='text-gray-600 ml-6 sm:ml-10 w-4/5 sm:w-3/5 pb-6'>
            <ReactMarkdown
               linkTarget={'_blank'}
               className='aboutPage space-y-2 mt-8 font-normal text-base'
            >
               {md}
            </ReactMarkdown>

            <div className='mt-8 mb-2 font-semibold text-md'>
               PROPDATE COUNT
            </div>
            {updates && (
               <div className='flex flex-col'>
                  <div className='flex flex-row'>
                     <div className='p-2 text-sm border-y border-l w-44 font-semibold'>
                        Week
                     </div>
                     <div className='p-2 text-sm border w-8  font-semibold text-center'>
                        #
                     </div>
                  </div>
                  {table.map((r, i) => (
                     <div key={i} className='flex flex-row'>
                        <div className='p-2 text-sm border-b border-l w-44'>
                           {formatDate(r.date)}
                        </div>
                        <div className='p-2 text-sm border-b border-x w-8 text-center'>
                           {r.count}
                        </div>
                     </div>
                  ))}
               </div>
            )}
         </div>
      </div>
   )
}
