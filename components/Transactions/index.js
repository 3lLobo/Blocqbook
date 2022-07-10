import { useGetTransactionsQuery } from "../../app/covApi"
import { TrscTable } from "./trscTable"
import { useDispatch, useSelector } from 'react-redux'
import { skipToken } from "@reduxjs/toolkit/dist/query"



export const Transactions = () => {
  const store = useSelector(state => state.evm)
  const dispatch = useDispatch()

  const address = process.env.NEXT_PUBLIC_MYADDRESS
  const { data, loading, error } = useGetTransactionsQuery(
    store.connected
      ? {
        address: store.account,
        chain_id: store.chainId,
      }
      : skipToken
  )
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  if (!data) return <p>No data</p>

  // TODO: check if all transactions are displayed
  console.log("transactions", data)
  return (
    <div>
      {/* <h1>Transactions</h1>
      <ul>
        {data?.items?.map((transaction) => (
          <li key={transaction.tx_hash}>
            <p>{transaction.from_address === address.toLocaleLowerCase() ? transaction.to_address : transaction.from_address }</p>
          </li>
        ))}
      </ul> */}
      <TrscTable transactions={data?.items} address={address} />
    </div>
  )
}
