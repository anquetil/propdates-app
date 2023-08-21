'use client'

import { IBM_Plex_Mono } from "next/font/google";
import { update } from "@/utils/update";
import { Address, useEnsName } from "wagmi";
import Link from "next/link";
import useGetPropAdmin from "@/hooks/useGetPropAdmin";
import { useSearchParams } from "next/navigation";
import { LoadingNoggles } from "@/components/LoadingNoggles";
import { formatTimestampString } from "@/utils/funcs";
import { ConnectButton } from "@rainbow-me/rainbowkit";
const mono = IBM_Plex_Mono({
   subsets: ['latin'],
   weight: ['100', '200', '300', '400', '500', '600', '700']
})

export default function AdminPage() {
   console.log('here in proppage')
   const data = 0
   if (data == undefined) return <main className="flex min-h-screen flex-col w-3/4"><LoadingNoggles /></main>

   return (
      <main className="flex min-h-screen flex-col w-3/4">
         <div className={`${mono.className} text-xl`}>
            Manage Permissions 
         </div>

         <ConnectButton/>
      </main>
   )
}