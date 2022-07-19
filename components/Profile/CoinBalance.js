// List item to display the address's balance of a coin.
// The balance needs to be divided by the exponential of its decimals.
// Also display the coin logo and name.
// Style the component with tailwind.

import Image from 'next/image'

export function CoinBalance({ item, quote_currency }) {
  const {
    contract_decimals,
    contract_name,
    contract_ticker_symbol,
    contract_address,
    supports_erc,
    logo_url,
    last_transferred_at,
    type,
    balance,
    balance_24h,
    quote_rate,
    quote_rate_24h,
    quote,
    quote_24h,
    nft_data,
  } = item
  const balanceInEth = parseFloat(
    balance / Math.pow(10, contract_decimals)
  ).toPrecision(3)
  const quoteInUsd = parseFloat(quote_rate * balanceInEth).toPrecision(3)

  console.log(contract_ticker_symbol, logo_url)

  return (
    <div className="grid grid-cols-5 justify-center place-items-center even:bg-indigo-100 rounded-bl-xl rounded-tr-xl px-3">
      <div className="relative flex col-span-1 h-6 w-6 rounded-full bg-slate-100 my-1">
        <Image layout="fill" src={logo_url} alt={contract_name} />
      </div>
      <div className="col-span-2">
        <div className=" grid grid-cols-2 space-x-1">
          <div className="text-sm text-indigo-900  text-right">
            {balanceInEth}
          </div>
          <div className="text-sm font-semibold text-left">
            {contract_ticker_symbol}
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <div className=" grid grid-cols-2 space-x-1 justify-center">
          <div className="text-sm text-indigo-900 text-right ">
            {' '}
            {quoteInUsd}
          </div>
          <div className="text-sm font-semibold text-left">
            {quote_currency}
          </div>
        </div>
      </div>
    </div>
  )
}
