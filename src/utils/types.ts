import { Address } from 'viem'

export const zeroAddress = '0x0000000000000000000000000000000000000000'

export type PropUpdate = {
   id: string
   admin: Address
   isCompleted: boolean
   update: string
   transactionHash: string
   blockTimestamp: string
   prop: {
      id: string
      proposer: Address
      title: string
   }
}

export type Proposal = {
   id: string
   title: string
   proposer: Address
   admin: Address
   isCompleted: boolean
   updates: PropUpdate[]
   count: number
}

export type MinimalProp = {
   id: string
   title: string
   proposer: Address
   admin: Address
   executed: boolean
   isCompleted: boolean
   count: number
}
