import {
   useContractWrite,
   usePrepareContractWrite,
   useWaitForTransaction,
} from 'wagmi'
import { propdatesAddress, propdatesABI } from '@/generated'

export function usePostUpdate(propID: number, updateText: string, completed: boolean) {
   const { config } = usePrepareContractWrite({
      address: propdatesAddress[1],
      abi: propdatesABI,
      functionName: 'postUpdate',
      args: [BigInt(propID), completed, updateText],
      enabled: true,
   })

   console.log(config)
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
