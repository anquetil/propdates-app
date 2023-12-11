import Link from 'next/link'
import useGetProps from '@/hooks/useGetProps'
import { MinimalProp } from '@/utils/types'
import { useEffect, useState } from 'react'

function getStatus(prop: MinimalProp) {
   if (prop.count == 0) {
      return 'NO UPDATES'
   } else if (prop.isCompleted) {
      return 'COMPLETED'
   } else {
      return 'IN PROGRESS'
   }
}

export function ProposalList({ mini = false }: { mini?: boolean }) {
   const [searchText, setSearchText] = useState<string>('')
   const [counts, setCounts] = useState([0, 0, 0]) // completed, no updates, in progerss
   const { proposals } = useGetProps()

   useEffect(() => {
      if (proposals) {
         let filteredProps = [...proposals].filter((p) => p.executed)
         setCounts([
            filteredProps.filter((p) => p.isCompleted).length,
            filteredProps.filter((p) => p.count == 0).length,
            filteredProps.filter((p) => !p.isCompleted && p.count > 0).length,
         ])
      }
   }, [proposals])

   if (!proposals) {
      return <></>
   }
   let sortedProps = [...proposals]
      .filter((p) => p.executed)
      .sort((a, b) => Number(a.id) - Number(b.id))
   if (searchText != '') {
      sortedProps = [...sortedProps].filter(
         (p) =>
            p.id.includes(searchText) ||
            p.title.toLowerCase().includes(searchText.toLowerCase())
      )
      console.log('filtering')
   }

   return (
      <div
         className={`flex flex-col h-fit lg:px-6 bg-white border gap-x-2 p-4 shadow-sm rounded-sm 
            ${
               mini
                  ? `sticky top-10 hidden md:flex shrink w-1/3 max-w-[350px]`
                  : `flex`
            }`}
      >
         <div className='font-medium'>Find a Proposal</div>
         <div className='flex flex-row my-2'>
            <div className='flex flex-col items-center w-1/3'>
               <div className='text-sm text-gray-700 font-semibold'>
                  {counts[0]}
               </div>
               <div className='text-xs text-gray-500 text-center'>
                  Completed
               </div>
            </div>
            <div className='flex flex-col items-center w-1/3'>
               <div className='text-sm text-gray-700 font-semibold'>
                  {counts[1]}
               </div>
               <div className='text-xs text-gray-500 text-center'>
                  No Updates
               </div>
            </div>
            <div className='flex flex-col items-center w-1/3'>
               <div className='text-sm text-gray-700 font-semibold'>
                  {counts[2]}
               </div>
               <div className='text-xs text-gray-500 text-center'>
                  In Progress
               </div>
            </div>
         </div>
         <input
            className='bg-gray-50 p-1 text-sm my-2 border focus:outline-0 focus:ring-[1px] focus:ring-gray-200 rounded-sm
          placeholder:text-gray-400'
            placeholder='Search proposals...'
            onChange={(e) => {
               setSearchText(e.target.value)
            }}
         ></input>
         <div className=' max-h-[400px] overflow-scroll'>
            {sortedProps.map((a, i) => (
               <div
                  key={i}
                  className='text-gray-700 text-xs flex min-w-0 max-w-full py-[2px] items-center gap-x-2 justify-between'
               >
                  <Link
                     className='truncate hover:underline md:flex-shrink md:flex-grow md:min-w-0 md:basis-0 md:max-w-fit md:w-0'
                     href={`/prop/${a.id}`}
                  >
                     {`#${a.id}: ${a.title}`}
                  </Link>
                  {
                     <div
                        className={`w-[20px] text-center text-xs md:shrink-0 rounded py-[2px] ${
                           getStatus(a) == 'COMPLETED'
                              ? 'text-green-500 bg-green-100'
                              : getStatus(a) == 'IN PROGRESS'
                              ? 'text-blue-500 bg-blue-100'
                              : 'bg-red-100 text-red-500'
                        }`}
                     >
                        {getStatus(a) == 'COMPLETED'
                           ? '✅'
                           : getStatus(a) == 'IN PROGRESS'
                           ? '⏳'
                           : '∅'}
                     </div>
                  }
               </div>
            ))}
         </div>
      </div>
   )
}
