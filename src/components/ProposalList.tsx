import { Action, MinimalProp, PropUpdate, zeroAddress } from '@/utils/types'
import { Address } from 'viem'
import { IBM_Plex_Mono } from 'next/font/google'
import Link from 'next/link'
import useGetProps from '@/hooks/useGetProps'
const mono = IBM_Plex_Mono({
   subsets: ['latin'],
   weight: ['100', '200', '300', '400', '500', '600', '700'],
})

export function ProposalList() {
   const { proposals } = useGetProps()
   console.log(proposals)
   if (!proposals) {
      return <></>
   }
   let sortedProps = [...proposals]
   sortedProps = sortedProps.sort((a, b) =>
      Number(a.id) < Number(b.id) ? -1 : 1
   )

   const completed = []
   const posted = []
   const none = []
   for (const p of sortedProps) {
      if (p.isCompleted) {
         completed.push(p)
      } else if (p.updates.length > 0) {
         posted.push(p)
      } else {
         none.push(p)
      }
   }

   const categories = [
      {
         title: 'Completed Props',
         array: completed,
         icon: '✅',
      },
      {
         title: 'In Progress Props',
         array: posted,
         icon: '🚧',
      } /*
      {
         title: "Inactive Props",
         array: none,
         icon: "⚠️"
      }*/,
   ]

   return (
      <div className='flex flex-row flex-wrap bg-white border gap-y-2 p-3 shadow-sm rounded-sm mt-1 md:px-5'>
         {categories.map((c, i) => (
            <div key={i} className='grow max-w-full'>
               <div className='font-semibold text-sm text-gray-800'>
                  {c.title}
               </div>
               <div className='flex flex-col flex-wrap w-full'>
                  {c.array.map((a, i) => (
                     <div
                        key={i}
                        className='text-gray-700 text-xs flex min-w-0 w-full md:w-64 py-1 hover:underline'
                     >
                        <Link className='truncate' href={`/prop/${a.id}`}>
                           {`#${a.id}: ${a.title}`}
                        </Link>
                     </div>
                  ))}
               </div>
            </div>
         ))}
      </div>
   )
}
