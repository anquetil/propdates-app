import { ImageResponse } from 'next/server'
import { PropUpdate } from '@/utils/types'

type Params = { params: { id: string } }

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

export const generateImageMetadata = async ({ params }: Params) => {
   return [
      {
         id: params.id,
         contentType: 'image/png',
         size: { width: 1200, height: 630 },
      },
   ]
}

export default async function Image({ params }: Params) {
   const update = await getUpdateInfo(params.id)

   return new ImageResponse(
      (
         <div
            style={{
               fontSize: '16px',
               background: '#ffffff',
               color: '#262626',
               width: '100%',
               height: '100%',
               display: 'flex',
               fontFamily: 'Inter',
               flexDirection: 'column',
               padding: '4em',
               gap: '1em',
            }}
         >
            {update.update}
         </div>
      )
   )
}
