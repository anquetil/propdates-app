import { Address } from 'viem'
import {
   useContractWrite,
   usePrepareContractWrite,
   useWaitForTransaction,
} from 'wagmi'
import { propdatesAddress, propdatesABI } from '@/generated'
import { wagmiConfig } from '@/app/providers'

export function useTransferAdmin(propID: number, newAdmin: Address, enabled: boolean) {
   const { config } = usePrepareContractWrite({
      address: propdatesAddress[1],
      abi: propdatesABI,
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
