// List item to display the address's balance of a coin. 
// The balance needs to be divided by the exponential of its decimals. 
// Also display the coin logo and name.

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
    nft_data
  } = item;
  const balanceInEth = balance / Math.pow(10, contract_decimals);
  const balanceInEth24h = balance_24h / Math.pow(10, contract_decimals);
  const quoteInEth = quote / Math.pow(10, contract_decimals);
  // const quoteInEth24h = quote_24h / Math.pow(10, contract_decimals);
  const quoteRate = quote_rate 
  // const quoteRate24h = quote_rate_24h / Math.pow(10, contract_decimals);

  return (
    <div className="flex flex-row">
      <div className="coin-balance__logo">
        <img src={logo_url} alt={contract_name} />
      </div>
      <div className="flex flex-row">
        {/* <div className="coin-balance__info-name">{contract_name}</div>
        <div className="coin-balance__info-symbol">{contract_ticker_symbol}</div>
        <div className="coin-balance__info-address">{contract_address}</div>
        <div className="coin-balance__info-type">{type}</div> */}
        <div className="coin-balance__info-balance">
          {balanceInEth} {contract_ticker_symbol}
        </div>
        <div className="coin-balance__info-balance-24h">
          {balanceInEth24h} {contract_ticker_symbol}
        </div>
        <div className="coin-balance__info-quote">
          {quoteRate} {quote_currency}
        </div>
      </div>
    </div>
  )
}

