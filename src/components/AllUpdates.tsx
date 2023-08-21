'use client'

import { update } from "@/utils/update"
import { PropUpdate } from "./PropUpdate"


export function AllUpdates({updates} : {updates: update[]}){

   return (
      <div className="mt-4 w-full">
         {
            updates.map((u) => (
               <PropUpdate key={u.id} data={u}/>
            ))
         }
      </div>
   )
}