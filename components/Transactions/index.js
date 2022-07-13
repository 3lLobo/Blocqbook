import { useGetTransactionsQuery } from '../../app/covApi'
import { TrscTable } from './trscTable'
import { useDispatch, useSelector } from 'react-redux'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { useGetAllTransactionsQuery } from '../../app/covApi'
import { BezierSpinner } from '../Spinner/BezierSpinner'

export const Transactions = () => {
  const store = useSelector((state) => state.evm)
  const dispatch = useDispatch()

  const address = process.env.NEXT_PUBLIC_MYADDRESS
  const { data, loading, error } = useGetAllTransactionsQuery(
    store.connected
      ? {
        address: store.account,
        // chain_id: store.chainId,
      }
      : skipToken,
    {
      pollingInterval: 300_000, // 5 minutes is the covalent update time
    }
  )
  if (loading) return (
    // if (loading) return (
    <div
      className="flex justify-center items-center mt-11"
    >
      <BezierSpinner
        radius={10}
        // text="Loading transactions..."
      />
    </div>
  )
  if (error) {
    console.log('🚀 ~ file: index.js ~ line 23 ~ Transactions ~ error', error)
    // TODO: throw toast with error
    return <p>Error: {error.message}</p>
  }
  if (!data) return (
    <div
      className="flex flex-col items-center justify-center mt-11 text-bold text-center dark:text-slate-500"
    >
      Zero transactions
    </div>
  )

  const allItems = []
  data.forEach((chainData) => {
    const chain_id = chainData.chain_id
    if (chainData.items.length > 0) {
      chainData.items.forEach((item) => {
        const newItem = {
          ...item,
          chain_id,
        }
        allItems.push(newItem)
      })
    }
  })
  // Sort transactions by date ✅
  allItems.sort((a, b) => { return Date.parse(b.block_signed_at) - Date.parse(a.block_signed_at) })
  console.log("🚀 ~ file: index.js ~ line 62 ~ allItems.sort ~ allItems", allItems)

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
      <TrscTable transactions={allItems} address={address} />
    </div>
  )
}
