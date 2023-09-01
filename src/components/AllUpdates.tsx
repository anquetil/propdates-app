'use client'

import { PropUpdate } from '@/utils/types'
import { PropUpdateCard } from './PropUpdateCard'

export function AllUpdates({
   updates,
   context = false,
}: {
   updates: PropUpdate[]
   context?: boolean
}) {
   return (
      <div className='w-full space-y-8'>
         {updates.map((u) => (
            <PropUpdateCard key={u.id} update={u} context={context} />
         ))}
      </div>
   )
}
