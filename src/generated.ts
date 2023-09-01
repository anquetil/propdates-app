// Generated by @wagmi/cli@1.3.0 on 8/21/2023 at 9:29:04 AM
import {
   getContract,
   GetContractArgs,
   readContract,
   ReadContractConfig,
   writeContract,
   WriteContractMode,
   WriteContractArgs,
   WriteContractPreparedArgs,
   WriteContractUnpreparedArgs,
   prepareWriteContract,
   PrepareWriteContractConfig,
   watchContractEvent,
   WatchContractEventConfig,
   WatchContractEventCallback,
} from 'wagmi/actions';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Propdates
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x94b4fb16893C0Fb4E470eEf2559C24FD87FEd5F1)
 */
export const propdatesABI = [
   { type: 'error', inputs: [], name: 'NoZeroAddress' },
   { type: 'error', inputs: [], name: 'OnlyPendingPropUpdateAdmin' },
   { type: 'error', inputs: [], name: 'OnlyPropUpdateAdmin' },
   {
      type: 'event',
      anonymous: false,
      inputs: [
         {
            name: 'propId',
            internalType: 'uint256',
            type: 'uint256',
            indexed: true,
         },
         {
            name: 'isCompleted',
            internalType: 'bool',
            type: 'bool',
            indexed: true,
         },
         {
            name: 'update',
            internalType: 'string',
            type: 'string',
            indexed: false,
         },
      ],
      name: 'PostUpdate',
   },
   {
      type: 'event',
      anonymous: false,
      inputs: [
         {
            name: 'propId',
            internalType: 'uint256',
            type: 'uint256',
            indexed: true,
         },
         {
            name: 'oldAdmin',
            internalType: 'address',
            type: 'address',
            indexed: true,
         },
         {
            name: 'newAdmin',
            internalType: 'address',
            type: 'address',
            indexed: true,
         },
      ],
      name: 'PropUpdateAdminTransferStarted',
   },
   {
      type: 'event',
      anonymous: false,
      inputs: [
         {
            name: 'propId',
            internalType: 'uint256',
            type: 'uint256',
            indexed: true,
         },
         {
            name: 'oldAdmin',
            internalType: 'address',
            type: 'address',
            indexed: true,
         },
         {
            name: 'newAdmin',
            internalType: 'address',
            type: 'address',
            indexed: true,
         },
      ],
      name: 'PropUpdateAdminTransfered',
   },
   {
      stateMutability: 'view',
      type: 'function',
      inputs: [],
      name: 'NOUNS_DAO',
      outputs: [{ name: '', internalType: 'address payable', type: 'address' }],
   },
   {
      stateMutability: 'nonpayable',
      type: 'function',
      inputs: [{ name: 'propId', internalType: 'uint256', type: 'uint256' }],
      name: 'acceptPropUpdateAdmin',
      outputs: [],
   },
   {
      stateMutability: 'view',
      type: 'function',
      inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
      name: 'pendingPropUpdateAdmin',
      outputs: [{ name: '', internalType: 'address', type: 'address' }],
   },
   {
      stateMutability: 'nonpayable',
      type: 'function',
      inputs: [
         { name: 'propId', internalType: 'uint256', type: 'uint256' },
         { name: 'isCompleted', internalType: 'bool', type: 'bool' },
         { name: 'update', internalType: 'string', type: 'string' },
      ],
      name: 'postUpdate',
      outputs: [],
   },
   {
      stateMutability: 'view',
      type: 'function',
      inputs: [{ name: 'propId', internalType: 'uint256', type: 'uint256' }],
      name: 'propdateInfo',
      outputs: [
         {
            name: '',
            internalType: 'struct Propdates.PropdateInfo',
            type: 'tuple',
            components: [
               {
                  name: 'propUpdateAdmin',
                  internalType: 'address',
                  type: 'address',
               },
               { name: 'lastUpdated', internalType: 'uint88', type: 'uint88' },
               { name: 'isCompleted', internalType: 'bool', type: 'bool' },
            ],
         },
      ],
   },
   {
      stateMutability: 'nonpayable',
      type: 'function',
      inputs: [
         { name: 'propId', internalType: 'uint256', type: 'uint256' },
         { name: 'newAdmin', internalType: 'address', type: 'address' },
      ],
      name: 'transferPropUpdateAdmin',
      outputs: [],
   },
   { stateMutability: 'payable', type: 'receive' },
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x94b4fb16893C0Fb4E470eEf2559C24FD87FEd5F1)
 */
export const propdatesAddress = {
   1: '0x94b4fb16893C0Fb4E470eEf2559C24FD87FEd5F1',
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x94b4fb16893C0Fb4E470eEf2559C24FD87FEd5F1)
 */
export const propdatesConfig = {
   address: propdatesAddress,
   abi: propdatesABI,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Core
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link propdatesABI}__.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x94b4fb16893C0Fb4E470eEf2559C24FD87FEd5F1)
 */
export function getPropdates(
   config: Omit<GetContractArgs, 'abi' | 'address'> & {
      chainId?: keyof typeof propdatesAddress;
   }
) {
   return getContract({
      abi: propdatesABI,
      address: propdatesAddress[1],
      ...config,
   });
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link propdatesABI}__.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x94b4fb16893C0Fb4E470eEf2559C24FD87FEd5F1)
 */
export function readPropdates<
   TAbi extends readonly unknown[] = typeof propdatesABI,
   TFunctionName extends string = string,
>(
   config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi' | 'address'> & {
      chainId?: keyof typeof propdatesAddress;
   }
) {
   return readContract({
      abi: propdatesABI,
      address: propdatesAddress[1],
      ...config,
   } as unknown as ReadContractConfig<TAbi, TFunctionName>);
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link propdatesABI}__.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x94b4fb16893C0Fb4E470eEf2559C24FD87FEd5F1)
 */
export function writePropdates<
   TFunctionName extends string,
   TMode extends WriteContractMode,
   TChainId extends number = keyof typeof propdatesAddress,
>(
   config:
      | (Omit<
           WriteContractPreparedArgs<typeof propdatesABI, TFunctionName>,
           'abi' | 'address'
        > & {
           mode: TMode;
           chainId?: TMode extends 'prepared'
              ? TChainId
              : keyof typeof propdatesAddress;
        })
      | (Omit<
           WriteContractUnpreparedArgs<typeof propdatesABI, TFunctionName>,
           'abi' | 'address'
        > & {
           mode: TMode;
           chainId?: TMode extends 'prepared'
              ? TChainId
              : keyof typeof propdatesAddress;
        })
) {
   return writeContract({
      abi: propdatesABI,
      address: propdatesAddress[1],
      ...config,
   } as unknown as WriteContractArgs<typeof propdatesABI, TFunctionName>);
}

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link propdatesABI}__.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x94b4fb16893C0Fb4E470eEf2559C24FD87FEd5F1)
 */
export function prepareWritePropdates<
   TAbi extends readonly unknown[] = typeof propdatesABI,
   TFunctionName extends string = string,
>(
   config: Omit<
      PrepareWriteContractConfig<TAbi, TFunctionName>,
      'abi' | 'address'
   > & { chainId?: keyof typeof propdatesAddress }
) {
   return prepareWriteContract({
      abi: propdatesABI,
      address: propdatesAddress[1],
      ...config,
   } as unknown as PrepareWriteContractConfig<TAbi, TFunctionName>);
}

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link propdatesABI}__.
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x94b4fb16893C0Fb4E470eEf2559C24FD87FEd5F1)
 */
export function watchPropdatesEvent<
   TAbi extends readonly unknown[] = typeof propdatesABI,
   TEventName extends string = string,
>(
   config: Omit<
      WatchContractEventConfig<TAbi, TEventName>,
      'abi' | 'address'
   > & { chainId?: keyof typeof propdatesAddress },
   callback: WatchContractEventCallback<TAbi, TEventName>
) {
   return watchContractEvent(
      {
         abi: propdatesABI,
         address: propdatesAddress[1],
         ...config,
      } as unknown as WatchContractEventConfig<TAbi, TEventName>,
      callback
   );
}
