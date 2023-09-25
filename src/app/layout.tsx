import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
   title: 'Nouns Updates',
   description: 'Onchain Proposal Updates',
}

import { Providers } from './providers'

export default function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <html lang='en'>
         <body className={`${inter.className} bg-gray-50`}>
            <Providers>
               <div className='flex flex-col'>
                  <main className='flex flex-col min-h-screen'>{children}</main>
               </div>
            </Providers>
         </body>
      </html>
   )
}
