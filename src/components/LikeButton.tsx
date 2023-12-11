'use client'

import { useLikeMutation } from '@/hooks/useLikeMutation'
import useLikesQuery from '@/hooks/useLikesQuery'
import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { useAccount } from 'wagmi'

export function LikeButton({ updateId }: { updateId: string }) {
   const [forceFill, setForceFill] = useState(false)
   const { address, isConnected } = useAccount()
   const { data } = useLikesQuery(updateId)
   let count = 0
   let userLiked = false

   const likeMutation = useLikeMutation(updateId, address ?? '0x0')

   if (data) {
      count = data.length
      userLiked = data.some(
         (l) => isConnected && l.liker.toLowerCase() == address?.toLowerCase()
      )
   }

   return (
      <div className='h-4 flex flex-row items-center gap-x-1'>
         <div>
            {userLiked || forceFill ? (
               <div className='text-red-600 '>
                  <HeartFilledIcon />
               </div>
            ) : (
               <div
                  onClick={() => {
                     if(isConnected){
                        setForceFill(true)
                        likeMutation.mutate()
                     }
                  }}
                  className={`text-gray-600 ${
                     isConnected &&
                     'hover:cursor-pointer active:text-red-600 active:scale-125 ease-in-out transition-all'
                  }`}
               >
                  <HeartIcon />
               </div>
            )}
         </div>
         <div className={userLiked ? 'text-red-600' : 'text-gray-600'}>
            {count + (forceFill ? 1 : 0)}
         </div>
      </div>
   )
}
