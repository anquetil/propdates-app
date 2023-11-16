import Link from 'next/link'
import { AllUpdates } from '@/components/AllUpdates'
import { Proposal, zeroAddress } from '@/utils/types'
import { PageTitle } from '@/components/PageTitle'
import PropInfoPanel from '@/components/PropInfoPanel'
import axios from 'axios'
import { Metadata, ResolvingMetadata } from 'next'
import AddressDisplay from '@/components/AddressDisplay'

export async function generateMetadata(
   { params }: { params: { id: string } },
   parent: ResolvingMetadata
): Promise<Metadata> {
   // fetch data
   const { title } = await getPropInfo(params.id)

   // optionally access and extend (rather than replace) parent metadata
   const previousImages = (await parent).openGraph?.images || []
   const len = title.length
   const shortTitle = len > 60 ? `${title.substring(0, 60)}...` : title

   return {
      title: `Propdates: ${shortTitle}`,
      openGraph: {
         images: [/*'/some-specific-page-image.jpg',*/ ...previousImages],
      },
   }
}

async function getPropInfo(prop: string): Promise<Proposal> {
   const endpoint = process.env.GRAPHQL_API ?? ''
   const queryBody = `query propQuery {
      proposal(
            id: ${prop}
      ){
         id
         title
         proposer
         admin
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
   console.log(prop)

   const unclaimed = prop.admin == zeroAddress

   return (
      <div className='pb-8'>
         <PageTitle title={`#${prop.id}: ${prop?.title}`} />
         <div className='px-6 sm:px-10'>
            <div className='flex flex-col-reverse sm:flex-row gap-y-4 gap-x-10 mt-6 max-w-full'>
               <div className='w-full sm:w-3/4 sm:max-w-[900px]'>
                  <div className='flex flex-col space-y-1 text-md text-gray-500'>
                     {unclaimed && (
                        <div className='flex flex-col w-fit p-3 bg-yellow-100 text-yellow-600 border border-yellow-300 rounded'>
                           <div className='text-lg font-semibold'>
                              Unclaimed Proposal :(
                           </div>
                           <div className='mb-2'>
                              {` Is this your prop? The proposer (`}
                              <AddressDisplay address={prop.proposer} />
                              {`) will need to claim it`}
                           </div>
                           <Link
                              className='text-yellow-600 hover:text-yellow-800 underline'
                              href='/settings'
                           >
                              Claim here
                           </Link>
                        </div>
                     )}
                  </div>
                  {prop && <AllUpdates updates={prop.updates} />}
               </div>

               {!unclaimed && <PropInfoPanel prop={prop} />}
            </div>
         </div>
      </div>
   )
}
