import { PropUpdate } from '@/utils/types'
import { PageTitle } from '@/components/PageTitle'
import { PropUpdateCard } from '@/components/PropUpdateCard'
import { Metadata } from 'next'
import { formatTitle, getUpdateNumFromID, ordinals } from '@/utils/funcs'

export async function generateMetadata({
   params,
}: {
   params: { id: string }
}): Promise<Metadata> {
   // fetch data
   const update = await getUpdateInfo(params.id)
   console.log(params.id)
   console.log('got update: ', update)
   if (update == null) {
      //wait until i fixe memoization
      return {
         title: `Update ${params.id}`,
         openGraph: {
            url: `/update/${params.id}`,
         },
      }
   }
   const { prop, id } = update
   const title = prop.title

   const len = title.length
   const shortTitle = len > 40 ? `${title.substring(0, 60)}...` : title

   const updateNum = getUpdateNumFromID(id)

   return {
      title: `${ordinals(Number(updateNum))} Update for Prop ${formatTitle(
         prop.id,
         shortTitle
      )}`,
      openGraph: {
         url: `/update/${params.id}`,
      },
   }
}

async function getUpdateInfo(id: string): Promise<PropUpdate> {
   const endpoint =
      process.env.GRAPHQL_API ?? ""
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
      revalidate: 300,
   }

   const response = await (await fetch(endpoint, options)).json()
   console.log('response in getUpdateInfo: ', response)
   const update = response?.data?.propUpdate as PropUpdate
   return update
}

export default async function UpdatePage({
   params,
}: {
   params: { id: string }
}) {
   const update = await getUpdateInfo(params.id)
   if (update == null) {
      return (
         <div>
            <PageTitle title={`Update not Found`} />
            <div className='px-6 sm:px-10'>
               <div></div>
            </div>
         </div>
      )
   }
   const { prop } = update
   return (
      <div>
         <PageTitle title={`#${prop.id}: ${prop?.title}`} updateObj={update} />
         <div className='px-6 sm:px-10'>
            <PropUpdateCard update={update} collapsing={false} />
         </div>
      </div>
   )
}
