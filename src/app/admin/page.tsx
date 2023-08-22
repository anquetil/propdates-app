'use client'

import { IBM_Plex_Mono } from "next/font/google";
import { LoadingNoggles } from "@/components/LoadingNoggles";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Address, useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import useGetActions from "@/hooks/useGetActions";
import { Actions } from "@/components/Actions";
import Link from "next/link";
const mono = IBM_Plex_Mono({
   subsets: ['latin'],
   weight: ['100', '200', '300', '400', '500', '600', '700']
})

export default function AdminPage() {
   const data = 0
   if (data == undefined) return <main className="flex min-h-screen flex-col w-3/4"><LoadingNoggles /></main>
   
   const { isConnected, address } = useAccount()
   const { chain } = useNetwork()
   const { switchNetwork } = useSwitchNetwork()
   const correctChain = chain?.id === 1
   
   const { actions, loading} = useGetActions(address!, isConnected)

   return (
      <main className="'lex min-h-screen flex-col w-3/4 border-x-[1px] border-neutral-200 bg-white px-4 pt-8 pb-4">
         <div className={`${mono.className} text-4xl font-semibold mb-8`}>
            Manage Your Permissions 
         </div>

         {
            !isConnected ? (<ConnectButton showBalance={false} accountStatus="avatar" />)
            :
            !correctChain
            ?
            (
               <button
                  className="w-[150px]  border-blue-500 rounded-sm border-[1px] p-2 shadow-md bg-blue-600 hover:bg-blue-500 ease-in-out transition-all active:mt-[2px] active:mb-[-2px]"
                  onClick={() => switchNetwork?.(1)}
               >
                  <div className="text-opacity-90 text-sm text-white">
                     Switch to Mainnet
                  </div>
               </button>
            )
            :
            (
               actions ?
               (
                  <Actions actions={actions} address={address!}/>
               )
               :
               (
                  <LoadingNoggles/>
               )
            )
         }
      </main>
   )
}