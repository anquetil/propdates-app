'use client'

import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
   uri: 'https://api.goldsky.com/api/public/project_clljsl74d0h5u38txbc9y8cil/subgraphs/propdates/1.0.0/gn',
   cache: new InMemoryCache(),
})

export function Providers({ children }: { children: React.ReactNode }) {
   const [mounted, setMounted] = React.useState(false);
   React.useEffect(() => setMounted(true), []);
   return (
      <ApolloProvider client={client}>
         {mounted && children}
      </ApolloProvider>
   );
}