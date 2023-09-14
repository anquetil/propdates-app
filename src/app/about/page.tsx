'use client'

import { IBM_Plex_Mono } from 'next/font/google'
import { LoadingNoggles } from '@/components/LoadingNoggles'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Address, useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import useGetActions from '@/hooks/useGetActions'
import { Actions } from '@/components/Actions'
import Link from 'next/link'
import { PageTitle } from '@/components/PageTitle'
import ReactMarkdown from 'react-markdown'

export default function AboutPage() {
   let md =
      'Propdates is a contract built by [wilson](https://twitter.com/WilsonCusack) and a front-end built by [martin](https://twitter.com/anquetil).'
   md +=
      '\n\nIts goal is to make it easier for proposers to keep the Nouns community updated on their work.'
   md +=
      '\n\nTo set it up, a user needs to claim the admin role or transfer it to another address via the [admin page](https://propdates.wtf/admin).'
   md += '\n\nAll proposals updates are automatically refunded by the contract.'
   md +=
      '\n\nContract Address: [0x94b4fb16893c0fb4e470eef2559c24fd87fed5f1](https://etherscan.io/address/0x94b4fb16893c0fb4e470eef2559c24fd87fed5f1)'

   return (
      <div className='aboutPage'>
         <PageTitle title={'What is Propdates?'} home={true} />

         <ReactMarkdown
            linkTarget={'_blank'}
            className='space-y-2 mt-8 font-normal text-lg text-gray-700'
         >
            {md}
         </ReactMarkdown>
      </div>
   )
}
