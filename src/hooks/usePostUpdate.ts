import {
   useContractWrite,
   usePrepareContractWrite,
   useWaitForTransaction,
} from 'wagmi'
import { propdatesAddress, propdatesABI } from '@/generated'

export function usePostUpdate(propID: number, updateText: string) {
   const { config } = usePrepareContractWrite({
      address: propdatesAddress[1],
      abi: propdatesABI,
      functionName: 'postUpdate',
      args: [BigInt(propID), false, updateText],
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
