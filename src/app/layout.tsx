import './globals.css'
import type { Metadata } from 'next'
import { Inter, IBM_Plex_Mono } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
   title: 'Propdates',
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
         <body className={`${inter.className}`}>
            <Providers>
               <main className='flex min-h-screen flex-col w-4/5 min-w-[310px] max-w-[800px] border-x-[1px] border-neutral-200 bg-white px-6 pt-12 pb-4 shadow-sm'>
                  {children}
               </main>
            </Providers>
         </body>
      </html>
   )
}
