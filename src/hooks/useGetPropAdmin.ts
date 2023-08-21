import { useContractRead } from "wagmi";
import { propdatesABI, propdatesAddress } from "@/generated";

export function useGetPropAdmin(prop: number, enabled: boolean) {

   const { data, isLoading } = useContractRead({
      address: propdatesAddress[1],
      abi:  propdatesABI,
      functionName: 'propdateInfo',
      args: [BigInt(prop)],
      enabled: enabled
   })

   return {
      data,
      isLoading
   }
}

export default useGetPropAdmin