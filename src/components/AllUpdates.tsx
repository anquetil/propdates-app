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
      <div className='space-y-10 max-w-[900px]'>
         {updates.map((u) => (
            <PropUpdateCard key={u.id} update={u} context={context} />
         ))}
      </div>
   )
}
