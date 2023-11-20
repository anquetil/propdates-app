import { Action } from '@/utils/types'
import Link from 'next/link'

export function AdminPanelAction({
   action,
   tag,
}: {
   action: Action
   tag: {
      isCompleted: boolean
      isProposer: boolean
      isDefactoAdmin: boolean
      propPassed: boolean
   }
}) {
   return (
      <div
         className={`flex flex-col md:flex-row justify-between items-start md:items-center w-full
          bg-white hover:bg-gray-50 ease-in-out transition-all px-6 p-4 md:gap-x-6`}
      >
         <div className='flex flex-col md:flex-row gap-x-3 md:flex-grow max-w-full'>
            <Link
               className='md:truncate max-w-full truncate overflow-hidden whitespace-nowrap hover:cursor-pointer font-medium md:flex-shrink md:flex-grow md:min-w-0 md:basis-0 md:max-w-fit md:w-0'
               key={action.id}
               href={`/prop/${action.id}`}
            >
               {`#${action.id}: ${action.title}`}
            </Link>
            <div className='flex flex-row gap-x-2  my-2 md:my-0 shrink-0'>
               {tag.isCompleted && (
                  <div
                     className={`rounded w-fit text-xs py-1 px-2 bg-green-200 text-green-500`}
                  >
                     COMPLETED
                  </div>
               )}
               {!tag.propPassed && (
                  <div
                     className={`rounded w-fit text-xs py-1 px-2 bg-yellow-100 text-yellow-500`}
                  >
                     NOT PASSED
                  </div>
               )}
            </div>
         </div>

         {tag.isDefactoAdmin && (
            <div className='flex flex-row gap-x-2 w-fit shrink-0'>
               <Link
                  href={`/manage/${action.id}`}
                  className='w-fit bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white text-center text-sm  transition-all ease-in-out shadow-sm hover:shadow rounded-lg py-2 sm:py-1 px-[14px] border-gray-600 border'
               >
                  {`Transfer Admin`}
               </Link>

               <Link
                  href={`/post/${action.id}`}
                  className='w-fit bg-white text-center text-sm  transition-all ease-in-out shadow-sm hover:shadow rounded-lg py-2 sm:py-1 px-[14px] text-black border'
               >
                  Post
               </Link>
            </div>
         )}
      </div>
   )
}
