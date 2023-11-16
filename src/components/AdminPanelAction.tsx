import { Action } from "@/utils/types";
import Link from "next/link";

export function AdminPanelAction({ action, tag }: {
   action: Action, tag: {
      isCompleted: boolean
      isProposer: boolean
      isDefactoAdmin: boolean
      propPassed: boolean
   }
}){
   console.log(tag)

   return (
            <div
               className={`flex flex-col gap-y-2 justify-between items-start w-full bg-white px-6 p-4`}
            >
               <div className='flex flex-row sm:flex-row gap-x-2'>
                  <Link
                     className='max-w-[300px] w-fit truncate hover:cursor-pointer font-medium'
                     key={action.id}
                     href={`/prop/${action.id}`}
                  >
                     {`#${action.id}: ${action.title}`}
                  </Link>
                  <div className='flex flex-row gap-x-2'>
                     {tag.isCompleted && (
                        <div
                           className={`rounded text-xs py-1 px-2 bg-green-200 text-green-600`}
                        >
                           COMPLETED
                        </div>
                     )}
                     {tag.isProposer && (
                        <div
                           className={`rounded text-xs py-1 px-2 bg-purple-200 text-purple-600`}
                        >
                           PROPOSER
                        </div>
                     )}
                     {tag.isDefactoAdmin && (
                        <div
                           className={`rounded text-xs py-1 px-2 bg-blue-200 text-blue-600`}
                        >
                           ADMIN
                        </div>
                     )}
                  </div>
               </div>

               {tag.isDefactoAdmin && (
                  <>
                     <Link
                        href={`/manage/${action.id}`}
                        className='bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white text-center text-sm  transition-all ease-in-out shadow-sm hover:shadow rounded-lg py-2 sm:py-1 px-[14px] border-gray-600 border'
                     >
                        {`Transfer Admin`}
                     </Link>

                     <Link
                        href={`/post/${action.id}`}
                        className='bg-white text-center text-sm  transition-all ease-in-out shadow-sm hover:shadow rounded-lg py-2 sm:py-1 px-[14px] text-black border'
                     >
                        Post
                     </Link>
                  </>
               )}
            </div>
         )
 }                 
