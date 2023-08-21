'use client'

import { PropUpdate } from "@/utils/types"
import { PropUpdateCard } from "./PropUpdateCard"


export function AllUpdates({updates} : {updates: PropUpdate[]}){

   return (
      <div className="mt-4 w-full">
         {
            updates.map((u) => (
               <PropUpdateCard key={u.id} update={u}/>
            ))
         }
      </div>
   )
}