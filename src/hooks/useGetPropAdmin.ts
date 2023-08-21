import { useContractRead } from "wagmi";
import { propdatesABI, propdatesAddress } from "@/generated";

export function useGetPropAdmin(prop: number) {

   const { data, isLoading } = useContractRead({
      address: propdatesAddress[1],
      abi:  propdatesABI,
      functionName: 'propdateInfo',
      args: [BigInt(prop)]
   })

   return {
      data,
      isLoading
   }
}

export default useGetPropAdmin