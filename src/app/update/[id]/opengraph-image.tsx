import { ImageResponse } from 'next/server'
import { PropUpdate } from '@/utils/types'
import { Address, createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { type Font } from 'satori'
import { formatTimestampString, isMainnet, shortenHex } from '@/utils/funcs'

type Params = { params: { id: string } }

async function getFonts(): Promise<Font[]> {
   const [interRegular, interMedium, interSemiBold, interBold, robotoMono] =
      await Promise.all([
         fetch(`https://rsms.me/inter/font-files/Inter-Regular.woff`).then(
            (res) => res.arrayBuffer()
         ),
         fetch(`https://rsms.me/inter/font-files/Inter-Medium.woff`).then(
            (res) => res.arrayBuffer()
         ),
         fetch(`https://rsms.me/inter/font-files/Inter-SemiBold.woff`).then(
            (res) => res.arrayBuffer()
         ),
         fetch(`https://rsms.me/inter/font-files/Inter-ExtraBold.woff`).then(
            (res) => res.arrayBuffer()
         ),
         fetch(`https://fonts.cdnfonts.com/s/16061/RobotoMono-Light.woff`).then(
            (res) => res.arrayBuffer()
         ),
      ])

   return [
      {
         name: 'Inter',
         data: interRegular,
         style: 'normal',
         weight: 400,
      },
      {
         name: 'Inter',
         data: interMedium,
         style: 'normal',
         weight: 500,
      },
      {
         name: 'Inter',
         data: interSemiBold,
         style: 'normal',
         weight: 600,
      },
      {
         name: 'Inter',
         data: interBold,
         style: 'normal',
         weight: 700,
      },
      {
         name: 'RobotoMono',
         data: robotoMono,
         style: 'normal',
         weight: 300,
      },
   ]
}

async function getUpdateInfo(id: string): Promise<PropUpdate> {
   const endpoint =
      (isMainnet()
         ? process.env.NEXT_PUBLIC_GRAPHQL_API
         : process.env.NEXT_PUBLIC_GRAPHQL_API_SEPOLIA) ?? ''
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
   const update = response?.data?.propUpdate as PropUpdate
   console.log('in open-graph image')
   return update
}

export const generateImageMetadata = async ({ params }: Params) => {
   console.log('here in generateimagedta, ', params)
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
   if (update == null) {
      // doens't exist
      return null
   }

   console.log('Update in update/[id]/opengraph-image', update)
   const {
      prop,
      //isCompleted,
      blockTimestamp,
      admin,
      update: textUpdate,
   } = update

   const client = createPublicClient({
      chain: mainnet,
      transport: http(
         `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
      ),
   })
   const ensName = await client.getEnsName({ address: admin as Address })
   const nounsAvatar =
      'https://pbs.twimg.com/profile_images/1467601380567359498/oKcnQo_S_400x400.jpg'
   const ensAvatar = ensName
      ? await client.getEnsAvatar({ name: ensName })
      : nounsAvatar
   const idString = `#${prop.id}`
   return new ImageResponse(
      (
         <div
            style={{
               width: '100%',
               height: '100%',
               display: 'flex',
               fontFamily: 'Inter',
               flexDirection: 'column',
               background: 'white',
               fontWeight: '400',
               padding: '30px 60px 0px 60px',
            }}
         >
            <div
               style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  paddingBottom: '15px',
                  borderBottom: '2px',
                  borderColor: 'rgb(240, 240, 240)',
               }}
            >
               <div
                  style={{
                     color: 'rgb(156, 163, 175)',
                     fontSize: '22px',
                  }}
               >
                  {idString}
               </div>
               <div
                  style={{
                     fontSize: '28px',
                     fontWeight: '500',
                     color: 'rgb(55, 65, 81)',
                  }}
               >
                  {prop.title}
               </div>
            </div>
            <div
               style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '20px',
                  marginTop: '30px',
               }}
            >
               <div
                  style={{
                     display: 'flex',
                     flexDirection: 'row',
                     alignItems: 'center',
                  }}
               >
                  {
                     // eslint-disable-next-line @next/next/no-img-element
                     <img
                        alt=''
                        src={ensAvatar ?? nounsAvatar}
                        style={{
                           width: '50px',
                           height: '50px',
                           borderRadius: '100%',
                        }}
                     />
                  }
                  <div
                     style={{
                        display: 'flex',
                        fontSize: '36px',
                        marginLeft: '20px',
                        fontWeight: '500',
                     }}
                  >{`${
                     ensName ?? shortenHex(update.admin)
                  } posted an update`}</div>
               </div>
               <div
                  style={{
                     color: 'rgb(156, 163, 175)',
                     fontSize: '24px',
                     fontWeight: '400',
                  }}
               >
                  {formatTimestampString(blockTimestamp)}
               </div>
            </div>

            <div
               style={{
                  fontFamily: 'RobotoMono',
                  fontSize: '25px',
                  padding: '32px',
                  backgroundColor: '#fafafa',
                  borderRadius: '10px',
                  height: 'auto',
               }}
            >
               {textUpdate}
            </div>
         </div>
      ),
      {
         fonts: await getFonts(),
      }
   )
}
