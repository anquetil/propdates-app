'use client';

import { AllUpdates } from '@/components/AllUpdates';
import { LoadingNoggles } from '@/components/LoadingNoggles';
import { PageTitle } from '@/components/PageTitle';
import useGetUpdates from '@/hooks/useGetUpdates';
import { GearIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export default function Home() {
   const { updates } = useGetUpdates();

   return (
      <div>
         <PageTitle title={'🚧 Propdates'} gear={true} />

         {updates ? (
            <AllUpdates updates={updates} context={true} />
         ) : (
            <LoadingNoggles />
         )}
      </div>
   );
}
