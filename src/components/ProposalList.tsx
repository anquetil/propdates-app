import Link from 'next/link'
import useGetProps from '@/hooks/useGetProps'

export function ProposalList({ mini = false }: { mini?: boolean }) {
   const { proposals } = useGetProps()
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
      },
   ]

   if (!mini) {
      categories.push({
         title: 'Inactive Props',
         array: none,
         icon: '⚠️',
      })
   }

   return (
      <div
         className={`flex-row flex-wrap h-fit md:px-6 bg-white border gap-y-2 gap-x-2 p-4 shadow-sm rounded-sm 
            ${
               mini
                  ? `sticky top-10 hidden md:flex shrink  max-w-[275px]`
                  : `flex`
            }`}
      >
         {categories.map((c, i) => (
            <div key={i} className='grow max-w-full'>
               <div className='font-semibold text-sm text-gray-800'>
                  {c.title}
               </div>
               <div
                  className={`${
                     c.title.includes('Inactive')
                        ? 'columns-2 md:columns-3 gap-x-8'
                        : 'flex flex-col flex-wrap'
                  } w-full`}
               >
                  {c.array.map((a, i) => (
                     <div
                        key={i}
                        className='text-gray-700 text-xs flex min-w-0 w-fit max-w-full py-1 hover:underline'
                     >
                        <Link className='truncate' href={`/prop/${a.id}`}>
                           {`#${a.id}: ${a.title}`}
                        </Link>
                     </div>
                  ))}
               </div>
            </div>
         ))}
         {mini && (
            <Link
               href='/props'
               className='w-full text-left text-sm hover:underline hover:underline-offset-2 text-gray-400'
            >
               View all props
            </Link>
         )}
      </div>
   )
}
