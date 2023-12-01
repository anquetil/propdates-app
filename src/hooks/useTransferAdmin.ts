import { Address } from 'viem'
import {
   useContractWrite,
   usePrepareContractWrite,
   useWaitForTransaction,
} from 'wagmi'
import { CONTRACT_ADDRESSES } from '@/utils/addresses'
import { v2ABI } from '@/utils/propdatesV2ABI'
import { isMainnet } from '@/utils/funcs'

export function useTransferAdmin(
   propID: number,
   newAdmin: Address,
   enabled: boolean
) {
   const { config } = usePrepareContractWrite({
      address: CONTRACT_ADDRESSES[isMainnet() ? 1 : 11155111].V2,
      abi: v2ABI,
      functionName: 'transferPropUpdateAdmin',
      args: [BigInt(propID), newAdmin],
      enabled: enabled,
   })

   const { write, data } = useContractWrite(config)

   const {
      data: transactionData,
      isError,
      isLoading,
      isSuccess,
      status,
      error,
   } = useWaitForTransaction({
      hash: data?.hash,
   })

   return {
      write,
      error,
      transactionData,
      isError,
      isLoading,
      isSuccess,
      status,
   }
}

export default useTransferAdmin
