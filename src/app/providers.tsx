'use client'

import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import '@rainbow-me/rainbowkit/styles.css'

import { Analytics } from '@vercel/analytics/react'

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

const client = new ApolloClient({
   uri: 'https://api.goldsky.com/api/public/project_clljsl74d0h5u38txbc9y8cil/subgraphs/propdates-subgraph/1.1.4/gn',
   cache: new InMemoryCache(),
})

const { chains, publicClient } = configureChains(
   [mainnet],
   [
      alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID ?? '' }),
      publicProvider(),
   ]
)

const { connectors } = getDefaultWallets({
   appName: 'PropDates',
   projectId: '023cdeb533db1bcd5a099bf4677e0808',
   chains,
})

export const wagmiConfig = createConfig({
   autoConnect: true,
   connectors,
   publicClient,
})

export function Providers({ children }: { children: React.ReactNode }) {
   const [mounted, setMounted] = React.useState(false)
   React.useEffect(() => setMounted(true), [])
   return (
      <ApolloProvider client={client}>
         <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains} initialChain={mainnet}>
               {mounted && children}
               <Analytics />
            </RainbowKitProvider>
         </WagmiConfig>
      </ApolloProvider>
   )
}
