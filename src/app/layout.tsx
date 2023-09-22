import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
   title: 'Nouns Updates',
   description: 'Onchain Proposal Updates',
   openGraph: {
      images: ['/meta.png'],
   },
}

import { Providers } from './providers'

export default function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <html lang='en'>
         <body className={`${inter.className} bg-white`}>
            <Providers>
               <div className='flex flex-col items-center'>
                  <main className='flex min-h-screen flex-col w-[90%] sm:w-4/5 min-w-[310px] max-w-[800px] px-2 sm:px-6 pt-8 pb-4'>
                     {children}
                  </main>
               </div>
            </Providers>
         </body>
      </html>
   )
}
