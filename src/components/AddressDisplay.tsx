'use client'

import React from 'react'
import Link from 'next/link'
import { type Address } from 'wagmi'
import useGetName from '@/hooks/useGetName'

const AddressDisplay: React.FC<{
   address: Address
   trim?: boolean
   blue?: boolean
}> = ({ address, trim = false, blue = false }) => {
   const { name, isLoading, guarantee } = useGetName(address)
   return (
      <Link
         className={`hover:underline underline-offset-2 ${
            blue && 'text-blue-700'
         }`}
         href={`https://etherscan.io/address/${address}`}
      >
         {isLoading
            ? guarantee
            : name.includes('.eth') && trim
            ? name.substring(0, name.length - 4)
            : name}
      </Link>
   )
}

export default AddressDisplay
