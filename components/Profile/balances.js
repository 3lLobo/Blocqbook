import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import { ChainLogo } from '../ChainLogo'
import { CoinBalance } from './coinBalance'



export default function Balances({balances}) {

  // const balances = balancesAddress

  return (
    // <div className="w-40 px-4 pt-16">
      <div className="flex flex-col mx-auto rounded-2xl bg-snow-muted dark:bg-indigo-300 p-2">
        {balances.map((chain) => (
          <Disclosure
          // TODO: Map the chainname instead of the chainid
            key={chain.chain_id}
          >
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <ChainLogo chainId={chain.chain_id} />
                  <ChevronUpIcon
                    className={`${open ? 'rotate-180 transform' : ''
                      } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="grid grid-flow-row auto-rows-min px-1 py-2 text-sm ">
                  {chain.items.map((item) => {
                    if (item.type !== 'dust' && item.nft_data === null) {
                      return <CoinBalance item={item} quote_currency={chain.quote_currency} />
                    }
                  }
                  )}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}

      </div>
    // </div
  )
}
