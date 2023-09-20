import React from 'react'
import Link from 'next/link'
import { useAccount, type Address } from 'wagmi'
import useGetName from '../hooks/useGetName'

const AddressDisplay: React.FC<{
   address: Address
   trim?: boolean
}> = ({ address, trim = false }) => {
   const { address: accountAddress } = useAccount()
   const { name, isLoading, guarantee } = useGetName(address, accountAddress)
   return (
      <Link href={`https://mogu.wtf/address/${address}`}>
         {isLoading
            ? guarantee
            : name.includes('.eth') && trim
            ? name.substring(0, name.length - 4)
            : name}
      </Link>
   )
}

export default AddressDisplay
