import { PropUpdate } from '@/utils/types'
import { PageTitle } from '@/components/PageTitle'
import { PropUpdateCard } from '@/components/PropUpdateCard'
import { Metadata, ResolvingMetadata } from 'next'
import { getUpdateNumFromID } from '@/utils/funcs'

export async function generateMetadata(
   { params }: { params: { id: string } },
   parent: ResolvingMetadata
): Promise<Metadata> {
   // fetch data
   const update = await getUpdateInfo(params.id)
   const {
      prop: { title },
      id,
   } = update

   const previousImages = (await parent).openGraph?.images || []
   const len = title.length
   const shortTitle = len > 40 ? `${title.substring(0, 60)}...` : title

   const updateNum = getUpdateNumFromID(id)

   return {
      title: `Propdates: ${shortTitle}. Update ${updateNum}`,
      openGraph: {
         images: [...previousImages],
      },
   }
}

async function getUpdateInfo(id: string): Promise<PropUpdate> {
   const endpoint =
      'https://api.goldsky.com/api/public/project_clljsl74d0h5u38txbc9y8cil/subgraphs/propdates-subgraph/1.1.8/gn'
   const queryBody = {
      query: `
   query propQuery {
      propUpdate(
            id: "${id}"
      ){
         id
         admin
         prop {
            id
            proposer
            title
        	}
         isCompleted
         update
         transactionHash
         blockTimestamp
      }
   }`,
   }

   const headers = {
      'content-type': 'application/json',
   }

   const options = {
      method: 'POST',
      headers,
      body: JSON.stringify(queryBody),
      revalidate: 0,
   }
   const response = await (await fetch(endpoint, options)).json()
   const update = response?.data?.propUpdate as PropUpdate

   return update
}

export default async function UpdatePage({
   params,
}: {
   params: { id: string }
}) {
   const update = await getUpdateInfo(params.id)
   const { prop } = update

   return (
      <div>
         <PageTitle title={`#${prop.id}: ${prop?.title}`} updateObj={update} />
         <div className='px-6 sm:px-10'>
            <PropUpdateCard update={update} />
         </div>
      </div>
   )
}