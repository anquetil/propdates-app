import {
   useContractWrite,
   usePrepareContractWrite,
   useWaitForTransaction,
} from 'wagmi'
import { v2ABI } from '@/utils/propdatesV2ABI'
import { CONTRACT_ADDRESSES } from '@/utils/addresses'
import { isMainnet } from '@/utils/funcs'

export function usePostUpdate(
   propID: number,
   updateText: string,
   completed: boolean
) {
   const { config } = usePrepareContractWrite({
      address: CONTRACT_ADDRESSES[isMainnet() ? 1 : 11155111].V2,
      abi: v2ABI,
      functionName: 'postUpdate',
      args: [BigInt(propID), completed, updateText],
      enabled: true,
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

export default usePostUpdate
