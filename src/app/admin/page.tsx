'use client'

import { IBM_Plex_Mono } from "next/font/google";
import { LoadingNoggles } from "@/components/LoadingNoggles";
import { ConnectButton } from "@rainbow-me/rainbowkit";
const mono = IBM_Plex_Mono({
   subsets: ['latin'],
   weight: ['100', '200', '300', '400', '500', '600', '700']
})

export default function AdminPage() {
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