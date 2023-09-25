'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
export const CustomConnectButton = () => {
   return (
      <ConnectButton.Custom>
         {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
         }) => {
            // Note: If your app doesn't use authentication, you
            // can remove all 'authenticationStatus' checks
            const ready = mounted && authenticationStatus !== 'loading'
            const connected =
               ready &&
               account &&
               chain &&
               (!authenticationStatus ||
                  authenticationStatus === 'authenticated')
            return (
               <div
                  {...(!ready && {
                     'aria-hidden': true,
                     style: {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                     },
                  })}
               >
                  {(() => {
                     if (!connected) {
                        return (
                           <button
                              className={`w-36 text-sm text-gray-800 rounded border p-2 shadow-sm hover:shadow bg-white
                              ease-in-out transition-all active:mt-[2px] active:mb-[-2px]`}
                              onClick={openConnectModal}
                              type='button'
                           >
                              Connect Wallet
                           </button>
                        )
                     }
                     if (chain.unsupported) {
                        return (
                           <button
                              className={`w-36 text-sm text-white  rounded-sm border p-2 shadow-md bg-blue-600 hover:bg-blue-500 
                              ease-in-out transition-all active:mt-[2px] active:mb-[-2px]`}
                              onClick={openChainModal}
                              type='button'
                           >
                              Switch to mainnet
                           </button>
                        )
                     }
                     return (
                        <div className='flex flex-row gap-x-4 items-center'>
                           <button
                              className='flex flex-row items-center gap-x-2 px-3 py-1 shadow hover:shadow-md ease-in-out transition-all duration-200 rounded-md border'
                              onClick={openAccountModal}
                              type='button'
                           >
                              {chain.iconUrl && (
                                 // eslint-disable-next-line @next/next/no-img-element
                                 <img
                                    alt={chain.name ?? 'Chain icon'}
                                    src={chain.iconUrl}
                                    style={{ width: 16, height: 16 }}
                                 />
                              )}
                              {account.displayName}
                              <svg
                                 xmlns='http://www.w3.org/2000/svg'
                                 fill='none'
                                 viewBox='0 0 24 24'
                                 strokeWidth={1.5}
                                 stroke='currentColor'
                                 className='w-4 h-4'
                              >
                                 <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                                 />
                              </svg>
                           </button>
                        </div>
                     )
                  })()}
               </div>
            )
         }}
      </ConnectButton.Custom>
   )
}
