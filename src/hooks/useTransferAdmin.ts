
import { Address } from "viem";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { propdatesAddress, propdatesABI } from "@/generated";

export function useTransferAdmin(propID: number, newAdmin: Address) {

   const { config } = usePrepareContractWrite({
      address: propdatesAddress[1],
      abi: propdatesABI,
      functionName: 'transferPropUpdateAdmin',
      args: [BigInt(propID), newAdmin],
      enabled: true,
   })


   const { write, data } = useContractWrite(config)

   const { data: transactionData, isError, isLoading, isSuccess, status, error } = useWaitForTransaction({
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