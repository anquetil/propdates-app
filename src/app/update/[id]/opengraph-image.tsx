import { ImageResponse } from 'next/server'
import { PropUpdate } from '@/utils/types'
import { formatTimestampString } from '@/utils/funcs'
import { wagmiConfig } from '@/app/providers'
import { Address } from 'viem'

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

   const ensName  = await wagmiConfig.publicClient.getEnsName({address: update.admin as Address})
   const ensAvatar = ensName ? await wagmiConfig.publicClient.getEnsAvatar({ name: ensName }) : 'https://pbs.twimg.com/profile_images/1467601380567359498/oKcnQo_S_400x400.jpg'


   const {
      prop,
      isCompleted,
      blockTimestamp,
      admin,
      update: textUpdate,
   } = update

   return new ImageResponse(
      <div style={{
         width: '100',
         display: 'flex',
         flexDirection: 'column'
      }}>
         <>
            <div style={{
               fontSize: '0.875rem', //text-sm
               lineHeight: '1.25rem', // text-sm
               color: 'rgb(156,163,175)'
            }}>#{prop.id}</div>
            <div style={{ marginBottom: '0.25rem', color: 'rgb(55, 65, 81)', fontSize: '1.125rem', fontWeight: '500', textDecoration: 'underline' }}>
               {prop.title}
            </div>
         </>
         <div style={{ width: '100%', backgroundColor: 'white', borderRadius: '0.375rem', borderColor: 'rgb(226,232,240)', borderWidth: '1px', fontWeight: '400' }}>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', justifyContent: 'space-between', padding: '1rem', borderBottomWidth: '1px', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                     {
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                           style={{ height: '1.5rem', width: '1.5rem', borderRadius: '9999px' }}
                           src={
                              ensAvatar ??
                              'https://pbs.twimg.com/profile_images/1467601380567359498/oKcnQo_S_400x400.jpg'
                           }
                           alt={'avatar'}
                        />
                     }
                     <div style={{ fontWeight: '600', marginLeft: '0.5rem' }}>
                        {ensName ?? admin.substring(0, 7)}
                     </div>
                     {isCompleted && (
                     <div style={{ backgroundColor: 'rgb(187,247,208)', color: 'rgb(22,163,74)', marginLeft: '1rem', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: '500' }}>
                           COMPLETED
                        </div>
                     )}
                  </div>
                  <div style={{ textDecoration: 'underline', color: 'rgba(156, 163, 175)', fontSize: '0.875rem' }}>
                     {formatTimestampString(blockTimestamp)}
                  </div>
               </div>

            <div style={{ width: '100%', backgroundColor: '#fcfcfc', fontSize: '0.875rem', borderRadius: '0.375rem', color: 'rgba(75,85,99)', padding: '1rem', fontFamily: 'monospace' }}>
                  {textUpdate.substring(0, 200)}
               </div>
         </div>

      </div>
   )
}
