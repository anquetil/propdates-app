import Link from 'next/link'
import { AllUpdates } from '@/components/AllUpdates'
import { Proposal, zeroAddress } from '@/utils/types'
import { PageTitle } from '@/components/PageTitle'
import PropInfoPanel from '@/components/PropInfoPanel'
import axios from 'axios'
import { Metadata, ResolvingMetadata } from 'next'
import { formatTitle } from '@/utils/funcs'

export async function generateMetadata(
   { params }: { params: { id: string } },
   parent: ResolvingMetadata
): Promise<Metadata> {
   // fetch data
   const { title, id } = await getPropInfo(params.id)

   // optionally access and extend (rather than replace) parent metadata
   const previousImages = (await parent).openGraph?.images || []
   const len = title.length
   const shortTitle = len > 60 ? `${title.substring(0, 60)}...` : title
   const newTitle = formatTitle(id, shortTitle)

   return {
      title: `Propdates: ${newTitle}`,
      openGraph: {
         images: [/*'/some-specific-page-image.jpg',*/ ...previousImages],
      },
   }
}

async function getPropInfo(prop: string): Promise<Proposal> {
   const endpoint =
      'https://api.goldsky.com/api/public/project_clljsl74d0h5u38txbc9y8cil/subgraphs/propdates-subgraph/1.1.4/gn'
   const queryBody = `query propQuery {
      proposal(
            id: ${prop}
      ){
         id
         title
         proposer
         admin
         transferPending
         pendingAdmin
         isCompleted
         updates(orderBy: blockTimestamp orderDirection:desc) {
        	id
            admin
            prop {
               id
            }
         isCompleted
         update
         transactionHash
         blockTimestamp
        }
      }
   }`

   const result: { data: { data: { proposal: Proposal } } } = await axios.post(
      endpoint,
      {
         query: queryBody,
      }
   )

   return result.data.data.proposal
}

export default async function PropPage({ params }: { params: { id: string } }) {
   const prop = await getPropInfo(params.id)

   const unclaimed =
      prop.admin == zeroAddress && prop.pendingAdmin == zeroAddress

   return (
      <div>
         <PageTitle title={`#${prop.id}: ${prop?.title}`} />
         <PropInfoPanel prop={prop} />

         <div className='flex flex-col space-y-1 text-md text-gray-500'>
            {(unclaimed || prop.updates.length == 0) && (
               <div className='flex flex-row space-x-2 w-fit p-3 bg-yellow-100 text-yellow-600 border border-yellow-300 rounded'>
                  <div>⚠️</div>
                  <div>
                     {`No posts yet :( - is this you?  `}
                     <Link
                        className='text-yellow-600 hover:text-yellow-800 underline'
                        href='/settings'
                     >
                        Claim and write here
                     </Link>
                  </div>
               </div>
            )}
         </div>
         {prop && <AllUpdates updates={prop.updates} />}
         <div></div>
      </div>
   )
}
