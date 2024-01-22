import { useState } from "react"
import { Address, isAddress } from "viem"
import { normalize } from "viem/ens"
import { useEnsAddress } from "wagmi"

// eslint-disable-next-line no-unused-vars
export function AddressInput({returnAdmin}: {returnAdmin: (address: `0x${string}`) => void}){
   const [inputValue, setInputValue] = useState<string>("")
   const [info, setInfo] = useState<string>("")

   const tryToResolve = inputValue.includes('.eth')


   const { data } = useEnsAddress({
      name: inputValue,
      enabled: tryToResolve
   })

   if (data && data != "0x0000000000000000000000000000000000000000" && info != data) {
      console.log('found data: ', data)
      returnAdmin(data)
      setInfo(data)
   } else if(tryToResolve && info != "This ENS has no resolved address" && info != data) {
      console.log('did not find data, setting info')
      setInfo("This ENS has no resolved address")
   } else {
      console.log('no state change')
   }

   return (
      <div>
         <input
            className='mt-1 mb-4 rounded p-1 border border-neutral-200 min-w-[200px] sm:min-w-[410px]'
            type='text'
            name='newAdmin'
            id='newAdmin'
            onChange={(e) => {
               if(e.target.value == ""){
                  setInfo("")
               } else if (isAddress(e.target.value)) {
                  returnAdmin(e.target.value as Address)
                  setInfo(e.target.value)
                  // call back send value
               } else {
                  setInputValue(normalize(e.target.value))
                  if(tryToResolve){
                     setInfo("Checking ENS...")
                  } else {
                     setInfo("Not valid ENS or Address")
                  }
               }
            }}
         />
         <div className='text-gray-400 -mt-3 mb-3'>
            {info}
         </div>
      </div>
   )
}