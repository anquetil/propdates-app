import { propdatesABI } from '@/generated'
import { defineConfig } from '@wagmi/cli'
import { actions, etherscan } from '@wagmi/cli/plugins'
export default defineConfig({
   out: 'src/generated.ts',
   contracts: [
      /*{
         name: 'Propdates',
         abi: propdatesABI,
      },*/
   ],
   plugins: [
      etherscan({
         apiKey: '',
         chainId: 1,
         contracts: [
            {
               name: 'Propdates',
               address: '0x94b4fb16893C0Fb4E470eEf2559C24FD87FEd5F1',
            },
         ],
      }),
   ],
})
