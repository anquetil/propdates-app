import { Address } from "viem"

export type PropUpdate = {
   id: string
   admin: Address
   isCompleted: boolean
   update: string
   transactionHash: string
   blockTimestamp: string
   prop: {
      id: string
   }
}

export type Proposal = {
   id: string
   admin: Address
   transferPending: boolean
   pendingAdmin: Address
   isCompleted: boolean
   updates: PropUpdate[]
}