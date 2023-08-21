'use client'

import { IBM_Plex_Mono } from "next/font/google";
import { update } from "@/utils/update";
import { Address, useEnsName } from "wagmi";
import Link from "next/link";
const mono = IBM_Plex_Mono({
   subsets: ['latin'],
   weight: ['100', '200', '300', '400', '500', '600', '700']
})

export function PropUpdate({ data }: { data: update }) {

   return (
      <div className="">
         hello
      </div>
   )
}