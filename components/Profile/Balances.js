import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import { v4 } from 'uuid'
import { ChainLogo } from '../ChainLogo'
import { CoinBalance } from './CoinBalance'

export default function Balances({ balances }) {
  // const balances = balancesAddress
  console.log("Balance",balances)

  return (
    // <div className="w-40 px-4 pt-16">
    <div className="flex flex-col mx-auto rounded-2xl bg-snow-muted dark:bg-indigo-900 p-2 pr-4">
      {balances.map((chain) => (
        <div key={chain.chain}>
          {chain.items.length > 1 ? (
            <Disclosure
              key={"chain".concat(chain.chain_id)}
            >
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-between m-1 rounded-lg bg-indigo-100 px-4 py-2 text-left text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75 w-full">
                    <ChainLogo chainId={chain.chain_id} />
                    <ChevronUpIcon
                      className={`${
                        open ? 'rotate-180 transform' : ''
                      } h-5 w-5 text-indigo-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="grid grid-flow-row auto-rows-min px-1 py-2 text-sm ">
                    {chain.items.map((item) => {
                      if (item.type !== 'dust' && item.nft_data === null) {
                        return (
                          <CoinBalance
                            item={item}
                            quote_currency={chain.quote_currency}
                            key={v4()}
                          />
                        )
                      }
                    })}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ) : (
            <div className="flex justify-between rounded-lg bg-indigo-100 px-4 py-2 m-1 text-left text-sm font-medium text-indigo-900 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75 w-full opacity-50">
              <ChainLogo chainId={chain.chain_id} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
