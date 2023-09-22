import { shortenHex } from '@/utils/funcs'
import { type Address } from 'viem'
import { useEnsName } from 'wagmi'

export function useGetName(
   address: Address,
   connectedAddress?: Address | undefined
) {
   const manualMap = new Map()
   manualMap.set(
      '0x0bc3807ec262cb779b38d65b38158acc3bfede10',
      'Nouns DAO Treasury'
   )
   manualMap.set(
      '0x830bd73e4184cef73443c15111a1df14e495c706',
      'Nouns DAO Auction House'
   )
   manualMap.set('0x6f3e6272a167e8accb32072d08e0957f9c79223d', 'Nouns DAO')
   manualMap.set('0x0000000000000000000000000000000000000000', 'N/A')
   manualMap.set(
      '0x6b2645b468a828a12fea8c7d644445eb808ec2b1',
      'Federation Governance Pool'
   )
   manualMap.set('0x44d97d22b3d37d837ce4b22773aad9d1566055d9', 'Fork #0 Escrow')
   manualMap.set(
      '0xb1a32fc9f9d8b2cf86c068cae13108809547ef71',
      'Nouns DAO Proxy'
   )

   let name = ''
   const guarantee = shortenHex(address)
   let isLoading = false

   const { data: ensData, isLoading: ensLoading } = useEnsName({
      address: address,
   })

   if (ensLoading) {
      isLoading = true
   } else if (ensData && ensData != null) {
      name = ensData
      isLoading = false
   } else if (!ensLoading && address) {
      // DONE LOADING, NO ENS
      name =
         (manualMap.get(address.toLowerCase()) as string) || shortenHex(address)
      isLoading = false
   }

   return {
      name,
      isLoading,
      guarantee,
   }
}

export default useGetName
