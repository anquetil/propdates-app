'use client'

import { IBM_Plex_Mono } from "next/font/google";
import { Proposal, zeroAddress } from "@/utils/types";
import { Address, useAccount } from "wagmi";
import useTransferAdmin from "@/hooks/useTransferAdmin";
import { useState } from "react";

export function TransferAdminForm({connectedAddress, prop} : {connectedAddress: Address, prop: Proposal}){
   //
   const [newAdmin, setNewAdmin] = useState<Address>(connectedAddress)
   const { id, admin, pendingAdmin, transferPending, proposer } = prop
   const unclaimed = (admin == zeroAddress)
   const transferable = (!unclaimed && connectedAddress.toLowerCase() == admin.toLowerCase()) 
                     || (unclaimed && connectedAddress.toLowerCase() == proposer.toLowerCase())
      // either claimed and admin, or unclaimed and proposer

   const { isConnected } = useAccount()
   const { write, isSuccess, transactionData } = useTransferAdmin(Number(id), newAdmin)
   console.log(write)

   if(isSuccess){
      return (
         <div className="font-bold">
            {`Success! Transaction: `}
            <a className="underline text-blue-500 hover:text-blue-700" href={`https://etherscan.io/tx/${transactionData?.transactionHash}`}>
               {transactionData?.transactionHash}
            </a>
         </div>
      )
   }

   if(transferable){
      return (
         <div>
            {
            unclaimed ?
            (<div>The admin is not yet set for this proposal. 
               As the proposer, you need to claim it for yourself or transfer it to someone else.
            </div>)
            :
            (<div>You are the admin of this proposal. You can transfer the role to someone else. 
               Once they accept it, you will no longer be able to change the admin. They will be able to transfer it to whoever they want.
            </div>)
            }

            {transferPending && <div>{`There currently is an admin transfer pending to ${pendingAdmin}. Initiating a new one will cancel it.`}</div>}
            
            <div className="flex flex-col items-start mt-4">
               <div className="font-medium">New Admin:</div>
               <input className="mt-1 mb-4 rounded p-1 border-[1px] border-neutral-200 min-w-[410px]" type="text" name="newAdmin" id="newAdmin" pattern='^0x[a-fA-F0-9]{40}$' 
                  title='Must be valid Ethereum address.' onChange={(e) => {setNewAdmin(e.target.value as Address)}}defaultValue={connectedAddress}/>
               <button className="bg-blue-500  border-[1px] hover:opacity-90 transition-all ease-in-out shadow-sm rounded-lg py-[2px] px-[14px] text-white"
                  type="submit" onClick={() => {write?.()}}>Submit</button>
            </div>
         
         </div>
      )
   } else {
      return (
         <div>Only the admin (or proposer pre-claim) can transfer this.</div>
      )
   }
}
